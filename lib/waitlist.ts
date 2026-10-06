export const MAX_WAITLIST_REQUEST_BYTES = 4096;

export type WaitlistSuccess = {
  ok: true;
  status: "joined" | "already_joined";
};

export type WaitlistFailure = {
  ok: false;
  code:
    | "INVALID_REQUEST"
    | "INVALID_EMAIL"
    | "RATE_LIMITED"
    | "TEMPORARY_FAILURE";
};

export type WaitlistResponse = WaitlistSuccess | WaitlistFailure;

type RegistrationResult = "inserted" | "duplicate" | "failure";

type OperationalEvent = {
  event:
    | "waitlist_configuration_missing"
    | "waitlist_database_failure"
    | "waitlist_email_delivery_failed";
  requestId: string;
};

type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

type WaitlistHandlerDependencies = {
  configurationReady: () => boolean;
  getClientKey: (request: Request) => string;
  getRequestId: () => string;
  log: (event: OperationalEvent) => void;
  rateLimit: (key: string) => RateLimitResult;
  register: (email: string) => Promise<RegistrationResult>;
  sendWelcome: (email: string) => Promise<boolean>;
};

type SubmissionLock = {
  current: boolean;
};

export function acquireSubmissionLock(lock: SubmissionLock) {
  if (lock.current) {
    return false;
  }

  lock.current = true;
  return true;
}

export function releaseSubmissionLock(lock: SubmissionLock) {
  lock.current = false;
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  if (email.length > 254 || email.includes("..")) {
    return false;
  }

  const atIndex = email.indexOf("@");

  if (
    atIndex < 1 ||
    atIndex !== email.lastIndexOf("@") ||
    atIndex > 64
  ) {
    return false;
  }

  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(localPart)
  ) {
    return false;
  }

  if (
    domain.length > 253 ||
    !domain.includes(".") ||
    !domain
      .split(".")
      .every(
        (label) =>
          label.length > 0 &&
          label.length <= 63 &&
          /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label),
      )
  ) {
    return false;
  }

  return true;
}

export function hashRateLimitKey(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return `client-${(hash >>> 0).toString(36)}`;
}

export function createFixedWindowRateLimiter({
  limit,
  windowMs,
  now = Date.now,
}: {
  limit: number;
  windowMs: number;
  now?: () => number;
}) {
  const windows = new Map<string, { count: number; startedAt: number }>();

  return (key: string): RateLimitResult => {
    const currentTime = now();
    const currentWindow = windows.get(key);

    if (!currentWindow || currentTime - currentWindow.startedAt >= windowMs) {
      windows.set(key, { count: 1, startedAt: currentTime });
      return { allowed: true };
    }

    if (currentWindow.count >= limit) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil(
            (windowMs - (currentTime - currentWindow.startedAt)) / 1000,
          ),
        ),
      };
    }

    currentWindow.count += 1;
    return { allowed: true };
  };
}

function jsonResponse(body: WaitlistResponse, status: number, headers?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

export function createWaitlistHandler(dependencies: WaitlistHandlerDependencies) {
  return async function handleWaitlist(request: Request) {
    const requestId = dependencies.getRequestId();
    const rateLimit = dependencies.rateLimit(
      dependencies.getClientKey(request),
    );

    if (!rateLimit.allowed) {
      return jsonResponse(
        { ok: false, code: "RATE_LIMITED" },
        429,
        { "Retry-After": String(rateLimit.retryAfterSeconds) },
      );
    }

    if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
      return jsonResponse({ ok: false, code: "INVALID_REQUEST" }, 400);
    }

    const declaredLength = Number(request.headers.get("content-length"));

    if (
      Number.isFinite(declaredLength) &&
      declaredLength > MAX_WAITLIST_REQUEST_BYTES
    ) {
      return jsonResponse({ ok: false, code: "INVALID_REQUEST" }, 413);
    }

    let bodyText: string;

    try {
      bodyText = await request.text();
    } catch {
      return jsonResponse({ ok: false, code: "INVALID_REQUEST" }, 400);
    }

    if (
      new TextEncoder().encode(bodyText).byteLength >
      MAX_WAITLIST_REQUEST_BYTES
    ) {
      return jsonResponse({ ok: false, code: "INVALID_REQUEST" }, 413);
    }

    let body: unknown;

    try {
      body = JSON.parse(bodyText);
    } catch {
      return jsonResponse({ ok: false, code: "INVALID_REQUEST" }, 400);
    }

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body) ||
      Object.keys(body).length !== 1 ||
      !Object.hasOwn(body, "email") ||
      typeof (body as { email?: unknown }).email !== "string"
    ) {
      return jsonResponse({ ok: false, code: "INVALID_REQUEST" }, 400);
    }

    const email = normalizeEmail((body as { email: string }).email);

    if (!isValidEmail(email)) {
      return jsonResponse({ ok: false, code: "INVALID_EMAIL" }, 400);
    }

    if (!dependencies.configurationReady()) {
      dependencies.log({
        event: "waitlist_configuration_missing",
        requestId,
      });
      return jsonResponse({ ok: false, code: "TEMPORARY_FAILURE" }, 503);
    }

    let registration: RegistrationResult;

    try {
      registration = await dependencies.register(email);
    } catch {
      registration = "failure";
    }

    if (registration === "duplicate") {
      return jsonResponse({ ok: true, status: "already_joined" }, 200);
    }

    if (registration === "failure") {
      dependencies.log({
        event: "waitlist_database_failure",
        requestId,
      });
      return jsonResponse({ ok: false, code: "TEMPORARY_FAILURE" }, 503);
    }

    try {
      const delivered = await dependencies.sendWelcome(email);

      if (!delivered) {
        dependencies.log({
          event: "waitlist_email_delivery_failed",
          requestId,
        });
      }
    } catch {
      dependencies.log({
        event: "waitlist_email_delivery_failed",
        requestId,
      });
    }

    return jsonResponse({ ok: true, status: "joined" }, 200);
  };
}

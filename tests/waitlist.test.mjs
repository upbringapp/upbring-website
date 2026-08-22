import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_WAITLIST_REQUEST_BYTES,
  acquireSubmissionLock,
  createFixedWindowRateLimiter,
  createWaitlistHandler,
  isValidEmail,
  normalizeEmail,
  releaseSubmissionLock,
} from "../lib/waitlist.ts";

function jsonRequest(body, headers = {}) {
  return new Request("https://nasbring.com/api/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "203.0.113.10",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function createHarness(overrides = {}) {
  const calls = {
    emails: [],
    logs: [],
    registrations: [],
  };
  const handler = createWaitlistHandler({
    configurationReady: () => true,
    getClientKey: () => "test-client",
    getRequestId: () => "request-test",
    log: (event) => calls.logs.push(event),
    rateLimit: () => ({ allowed: true }),
    register: async (email) => {
      calls.registrations.push(email);
      return "inserted";
    },
    sendWelcome: async (email) => {
      calls.emails.push(email);
      return true;
    },
    ...overrides,
  });

  return { calls, handler };
}

async function responseBody(response) {
  return JSON.parse(await response.text());
}

test("accepts a valid email and returns joined", async () => {
  const { calls, handler } = createHarness();
  const response = await handler(jsonRequest({ email: "parent@example.com" }));

  assert.equal(response.status, 200);
  assert.deepEqual(await responseBody(response), {
    ok: true,
    status: "joined",
  });
  assert.deepEqual(calls.registrations, ["parent@example.com"]);
  assert.deepEqual(calls.emails, ["parent@example.com"]);
});

test("trims surrounding whitespace and lowercases the full email", async () => {
  const { calls, handler } = createHarness();
  await handler(jsonRequest({ email: "  Parent@Example.COM  " }));

  assert.deepEqual(calls.registrations, ["parent@example.com"]);
});

test("normalisation preserves dots and plus aliases", () => {
  assert.equal(
    normalizeEmail("  Parent.Name+Canopy@Example.COM "),
    "parent.name+canopy@example.com",
  );
});

test("uses a practical conservative email policy", () => {
  assert.equal(isValidEmail("parent@example.com"), true);
  assert.equal(isValidEmail("parent+canopy@example.co.in"), true);
  assert.equal(isValidEmail("parent@example"), false);
  assert.equal(isValidEmail(".parent@example.com"), false);
  assert.equal(isValidEmail("parent..name@example.com"), false);
});

test("rejects an invalid email", async () => {
  const { handler } = createHarness();
  const response = await handler(jsonRequest({ email: "not-an-email" }));

  assert.equal(response.status, 400);
  assert.deepEqual(await responseBody(response), {
    ok: false,
    code: "INVALID_EMAIL",
  });
});

test("rejects an empty body", async () => {
  const { handler } = createHarness();
  const response = await handler(jsonRequest(""));

  assert.equal(response.status, 400);
  assert.equal((await responseBody(response)).code, "INVALID_REQUEST");
});

test("rejects malformed JSON", async () => {
  const { handler } = createHarness();
  const response = await handler(jsonRequest('{"email":'));

  assert.equal(response.status, 400);
  assert.equal((await responseBody(response)).code, "INVALID_REQUEST");
});

test("rejects unexpected fields", async () => {
  const { handler } = createHarness();
  const response = await handler(
    jsonRequest({ email: "parent@example.com", admin: true }),
  );

  assert.equal(response.status, 400);
  assert.equal((await responseBody(response)).code, "INVALID_REQUEST");
});

test("rejects an oversized request", async () => {
  const { handler } = createHarness();
  const response = await handler(
    jsonRequest(
      JSON.stringify({
        email: `${"a".repeat(MAX_WAITLIST_REQUEST_BYTES)}@example.com`,
      }),
    ),
  );

  assert.equal(response.status, 413);
  assert.equal((await responseBody(response)).code, "INVALID_REQUEST");
});

test("returns a calm duplicate result without sending email", async () => {
  const { calls, handler } = createHarness({
    register: async (email) => {
      calls.registrations.push(email);
      return "duplicate";
    },
  });
  const response = await handler(jsonRequest({ email: "parent@example.com" }));

  assert.equal(response.status, 200);
  assert.deepEqual(await responseBody(response), {
    ok: true,
    status: "already_joined",
  });
  assert.deepEqual(calls.emails, []);
});

test("sanitises a temporary Supabase failure", async () => {
  const { calls, handler } = createHarness({
    register: async () => "failure",
  });
  const response = await handler(jsonRequest({ email: "parent@example.com" }));
  const serialized = await response.text();

  assert.equal(response.status, 503);
  assert.equal(JSON.parse(serialized).code, "TEMPORARY_FAILURE");
  assert.equal(serialized.includes("Supabase"), false);
  assert.deepEqual(calls.logs, [
    {
      event: "waitlist_database_failure",
      requestId: "request-test",
    },
  ]);
});

test("returns joined after successful Resend delivery", async () => {
  const { calls, handler } = createHarness();
  const response = await handler(jsonRequest({ email: "parent@example.com" }));

  assert.equal((await responseBody(response)).status, "joined");
  assert.deepEqual(calls.emails, ["parent@example.com"]);
  assert.deepEqual(calls.logs, []);
});

test("keeps registration successful when Resend reports failure", async () => {
  const { calls, handler } = createHarness({
    sendWelcome: async (email) => {
      calls.emails.push(email);
      return false;
    },
  });
  const response = await handler(jsonRequest({ email: "parent@example.com" }));

  assert.equal(response.status, 200);
  assert.equal((await responseBody(response)).status, "joined");
  assert.deepEqual(calls.logs, [
    {
      event: "waitlist_email_delivery_failed",
      requestId: "request-test",
    },
  ]);
});

test("prevents a repeated client submission while one is active", () => {
  const lock = { current: false };

  assert.equal(acquireSubmissionLock(lock), true);
  assert.equal(acquireSubmissionLock(lock), false);
  releaseSubmissionLock(lock);
  assert.equal(acquireSubmissionLock(lock), true);
});

test("returns a stable rate-limit response and retry header", async () => {
  const { handler } = createHarness({
    rateLimit: () => ({ allowed: false, retryAfterSeconds: 42 }),
  });
  const response = await handler(jsonRequest({ email: "parent@example.com" }));

  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "42");
  assert.deepEqual(await responseBody(response), {
    ok: false,
    code: "RATE_LIMITED",
  });
});

test("fixed-window limiting resets after the configured window", () => {
  let currentTime = 0;
  const limit = createFixedWindowRateLimiter({
    limit: 1,
    windowMs: 1000,
    now: () => currentTime,
  });

  assert.deepEqual(limit("client"), { allowed: true });
  assert.deepEqual(limit("client"), {
    allowed: false,
    retryAfterSeconds: 1,
  });
  currentTime = 1000;
  assert.deepEqual(limit("client"), { allowed: true });
});

test("does not expose or log a raw email address", async () => {
  const email = "private.parent@example.com";
  const { calls, handler } = createHarness({
    register: async () => "failure",
  });
  const response = await handler(jsonRequest({ email }));
  const serializedResponse = await response.text();
  const serializedLogs = JSON.stringify(calls.logs);

  assert.equal(serializedResponse.includes(email), false);
  assert.equal(serializedLogs.includes(email), false);
});

test("fails safely when server configuration is missing", async () => {
  const { calls, handler } = createHarness({
    configurationReady: () => false,
  });
  const response = await handler(jsonRequest({ email: "parent@example.com" }));

  assert.equal(response.status, 503);
  assert.equal((await responseBody(response)).code, "TEMPORARY_FAILURE");
  assert.deepEqual(calls.logs, [
    {
      event: "waitlist_configuration_missing",
      requestId: "request-test",
    },
  ]);
});

test("sanitises provider exceptions", async () => {
  const { calls, handler } = createHarness({
    register: async () => {
      throw new Error("provider details private.parent@example.com");
    },
  });
  const response = await handler(jsonRequest({ email: "parent@example.com" }));
  const serialized = await response.text();

  assert.equal(response.status, 503);
  assert.equal(serialized.includes("provider details"), false);
  assert.equal(JSON.stringify(calls.logs).includes("parent@example.com"), false);
});

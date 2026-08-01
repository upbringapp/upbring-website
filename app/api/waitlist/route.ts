import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import {
  createFixedWindowRateLimiter,
  createWaitlistHandler,
  hashRateLimitKey,
} from "@/lib/waitlist";

const rateLimit = createFixedWindowRateLimiter({
  limit: 5,
  windowMs: 60_000,
});

function getConfiguration() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey || !resendApiKey) {
    return null;
  }

  return { supabaseUrl, supabaseServiceRoleKey, resendApiKey };
}

const handleWaitlist = createWaitlistHandler({
  configurationReady: () => getConfiguration() !== null,
  getClientKey: (request) => {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientAddress =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip")?.trim() ||
      "unknown";

    return hashRateLimitKey(clientAddress);
  },
  getRequestId: () => crypto.randomUUID(),
  log: (event) => {
    console.error(JSON.stringify(event));
  },
  rateLimit,
  register: async (email) => {
    const configuration = getConfiguration();

    if (!configuration) {
      return "failure";
    }

    const supabase = createClient(
      configuration.supabaseUrl,
      configuration.supabaseServiceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
    const { error } = await supabase.from("waitlist").insert([{ email }]);

    if (!error) {
      return "inserted";
    }

    return error.code === "23505" ? "duplicate" : "failure";
  },
  sendWelcome: async (email) => {
    const configuration = getConfiguration();

    if (!configuration) {
      return false;
    }

    const resend = new Resend(configuration.resendApiKey);
    const { error } = await resend.emails.send({
      from: "Upbring <hello@updates.upbringapp.com>",
      to: [email],
      subject: "Welcome to Upbring",
      text: `Hi there,

Thank you for joining the Upbring waitlist.

We're glad you're here.

Upbring is being built for parents who want to stay close to their child's world—not through marks or comparisons, but through the small moments that often go unnoticed.

Over the coming weeks, we'll occasionally share updates as we move closer to opening early access.

Until then, thank you for believing in what we're building.

Warmly,

Upbring`,
    });

    return !error;
  },
});

export async function POST(request: Request) {
  return handleWaitlist(request);
}

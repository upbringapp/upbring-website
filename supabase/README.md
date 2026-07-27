# Waitlist infrastructure

The website waitlist endpoint requires these production environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: existing Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: server-only service-role key. Never prefix it
  with `NEXT_PUBLIC_` or expose it to browser code.
- `RESEND_API_KEY`: existing server-only Resend API key.

Before deploying the hardened endpoint:

1. Run the duplicate preflight query documented in
   `migrations/20260727000000_harden_waitlist_email.sql`.
2. Resolve any normalized duplicates deliberately. Do not delete rows without
   an approved data-retention decision.
3. Apply the migration through the normal reviewed Supabase migration process.
4. Verify RLS remains enabled and the `anon` role cannot insert into
   `public.waitlist`.
5. Add `SUPABASE_SERVICE_ROLE_KEY` to the server runtime environment.
6. Smoke-test one new address and one known duplicate without logging either
   address.

The migration is intentionally committed but not applied by this repository
change.

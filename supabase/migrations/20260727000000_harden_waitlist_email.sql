-- Apply only after reviewing the preflight query below in the target project.
-- The index creation fails safely when existing normalized duplicates are present.
--
-- Preflight:
-- select lower(btrim(email)) as normalized_email, count(*)
-- from public.waitlist
-- group by lower(btrim(email))
-- having count(*) > 1;

alter table public.waitlist enable row level security;

revoke insert on table public.waitlist from anon;

create unique index if not exists waitlist_email_normalized_unique
  on public.waitlist (lower(btrim(email)));

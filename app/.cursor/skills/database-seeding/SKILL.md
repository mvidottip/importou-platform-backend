---
name: database-seeding
description: Write and edit Importou SQL seeds (base.seed.sql + dev.seed.sql). Use when changing seed data, roles, demo orgs/users, or mentioning prisma:seed / base.seed / dev.seed.
---

# Database Seeding (Importou)

Seeds live in `src/infra/database/seeds/` and run via `src/infra/database/seeds/index.ts`:

1. `functions.sql`
2. `base.seed.sql` — always (roles catalog)
3. `dev.seed.sql` — only when `NODE_ENV` is `local` or `development` (demo orgs/users)

## Rules

- Prefer **fixed TypeIDs** already in the seed files; generate new ones with `typeid` / `typeid-js`, never invent broken suffixes by hand.
- Single-line `insert into ...` statements (same style as existing files).
- Timestamps: `generate_unique_second_timestamptz()`.
- **No `tenants/*.sql`.** Boundary is `organization` + `membership`.
- Demo password hash for `importou` is already in `dev.seed.sql` — reuse it for new demo users.
- Demo emails: `admin@importou.com`, `importer@importou.com`, `exporter@importou.com`, `broker@importou.com`.

## Run

```bash
yarn prisma:seed
```

On a dirty DB with conflicting unique keys, truncate seed tables or reset migrations before re-seeding (plain `INSERT`, not upsert).

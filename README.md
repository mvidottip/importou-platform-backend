# Importou Platform Backend

Skeleton NestJS + CQRS + Prisma (sem multi-tenant).

> Contexto: **[HANDOFF.md](./HANDOFF.md)** · Tasks: **[app/tasks/README.md](./app/tasks/README.md)**

## Stack

- NestJS 11 + `@nestjs/cqrs`
- Prisma 6 + PostgreSQL
- TypeID (`Id` VO)
- Auth JWT + Membership (a implementar)
- Ports vazios: Pay, KYB, Radar/Serpro

## Quick start

> Package manager: **Yarn**.

```bash
# Postgres (opcional — ou Postgres local/pgAdmin na 5432)
docker compose up -d

cd app
cp .env.example .env
yarn
yarn prisma:generate
yarn prisma:migrate
yarn prisma:seed
yarn start:dev
```

Seed:

- `base.seed.sql` — catálogo (roles); roda em qualquer env
- `dev.seed.sql` — usuários demo; só `local` / `development`

| Email | Role | Senha |
|-------|------|-------|
| `admin@importou.com` | admin | `importou` |
| `importer@importou.com` | importer | `importou` |
| `exporter@importou.com` | exporter | `importou` |
| `broker@importou.com` | broker | `importou` |

> Em banco já populado: `yarn prisma migrate reset` ou limpar tabelas antes.

Health: `GET http://localhost:3000/health`

## Estrutura

```
app/src/
  infra/          # database, env, gateways (ports)
  modules/        # domain slices
  shared/         # Id, BaseEvent
```

Cada módulo: `api / application / domain / infra`.

## Próximos passos

1. Auth + Membership + `@Roles`
2. Commands do loop `ImportOperation` → quote → proposal → aceite
3. Audit decorator
4. Ligar adapters reais (Pay / KYB / Serpro)

Schema espelho: `importou-platform-frontend/docs/proposed-backend-schema.prisma`

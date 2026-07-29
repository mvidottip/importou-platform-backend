# Importou Platform Backend

Skeleton NestJS + CQRS + Prisma (sem multi-tenant).

> Contexto: **[HANDOFF.md](./HANDOFF.md)** · Tasks: **[app/tasks/README.md](./app/tasks/README.md)**

## Stack

- NestJS 11 + `@nestjs/cqrs`
- Prisma 6 + PostgreSQL
- TypeID (`Id` VO)
- Auth JWT + Membership (padrão Block: `/public/auth/authenticate` + `/public/user/me`)
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

### Auth — smoke (curl)

```bash
# Login (qualquer dos 4 emails demo)
curl -s -X POST http://localhost:3000/public/auth/authenticate \
  -H "Content-Type: application/json" \
  -d '{"email":"importer@importou.com","password":"importou"}'
# → { "accessToken": "..." }

# Me (Bearer)
TOKEN="<accessToken>"
curl -s http://localhost:3000/public/user/me \
  -H "Authorization: Bearer $TOKEN"
# → id, membershipId, email, name, status, role, organization, …

# Senha errada → 401
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/public/auth/authenticate \
  -H "Content-Type: application/json" \
  -d '{"email":"importer@importou.com","password":"wrongpass"}'
```

PowerShell:

```powershell
$auth = Invoke-RestMethod http://localhost:3000/public/auth/authenticate -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"admin@importou.com","password":"importou"}'
Invoke-RestMethod http://localhost:3000/public/user/me `
  -Headers @{ Authorization = "Bearer $($auth.accessToken)" }
```

Smoke local (2026-07-29): 4 roles OK (`admin`/`importer`/`exporter`/`broker` + org type); senha errada e `/me` sem token → 401.

Swagger (dev): `http://localhost:3000/docs`

## Deploy (Render)

O Nest fica em `app/` — no Render, **Root Directory = `app`** (não `importou-platform-backend/app`).

| Campo | Valor |
|-------|--------|
| Root Directory | `app` |
| Build | `yarn install && yarn prisma:generate && yarn build` |
| Start | `yarn start:prod` |
| Health | `/health` |

Env: `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`, `PORT=3000`.  
Depois do 1º deploy: rodar migrate no Postgres (`yarn prisma:migrate:deploy`) e seed se quiser demo.

## Estrutura

```
app/src/
  infra/          # database, env, gateways (ports)
  modules/        # domain slices
  shared/         # Id, BaseEvent
```

Cada módulo: `api / application / domain / infra`.

## Próximos passos

1. ~~Auth + Membership + `@Roles`~~ (**done** — epic `prd-auth-membership-bootstrap`; smoke 4 logins + `/me`)
2. Commands do loop `ImportOperation` → quote → proposal → aceite
3. Audit decorator
4. Front: auth já na API; dados ainda mock (`USE_MOCK`) — desligar por domínio quando existir endpoint
5. Ligar adapters reais (Pay / KYB / Serpro)
6. Multi-membership: `POST /public/auth/authorize` como na Block

Schema espelho: `importou-platform-frontend/docs/proposed-backend-schema.prisma`

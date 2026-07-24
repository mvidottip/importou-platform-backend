# Technical Specification — Auth + Membership bootstrap

## Executive Summary

Implementar módulo `auth` + wiring de `membership` / `role` / `user` / `organization` / `person` / `contact` o suficiente para login JWT e autorização por role. Seguir layout Nest da Block: API → Application/CQRS → Domain → Infra. Sem Tenant: payload JWT `{ sub: userId, membershipId }`; guard resolve org + role.

## System Architecture

```
auth/
├── api/common/          → AuthAuthorizeGuard, Roles decorator, MembershipCurrent
├── api/public/          → AuthController (login, me)
├── application/public/  → LoginCommand, MeQuery + handlers
domain (módulos existentes) → enums já criados
infra                    → Prisma repos mínimos ou uso direto PrismaService no MVP seed
```

### Data flow

1. Login: busca Contact(email) → User → Membership ativa → valida password → JWT.
2. Request: Guard lê JWT → carrega Membership + Role + Organization → anexa em `request`.
3. `@Roles` compara `role.type` com metadata.

## Implementation Design

### JWT payload

```typescript
{ sub: string; membershipId: string }
```

### Roles decorator

```typescript
export const ROLES_KEY = "roles";
export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES_KEY, roles);
```

### Endpoints

| Method | Path | Auth | Roles |
|--------|------|------|-------|
| POST | `/auth/login` | public | — |
| GET | `/auth/me` | Bearer | any authenticated |

### Seed (emails = front mock)

| Email | Role | Org type |
|-------|------|----------|
| admin@importou.com | admin | platform |
| importer@importou.com | importer | importer (+ radar active limited) |
| exporter@importou.com | exporter | exporter |
| broker@importou.com | broker | broker (+ license) |

Password: qualquer string fixa hashada, ex. `importou` (só dev).

### Prisma

Schema já existe — sem migration de models novos; apenas `prisma migrate` inicial se ainda não rodou + seed script.

## Testing Strategy

- Unit: password validate; roles guard allow/deny.
- Manual: login 4 users; `/auth/me`; rota admin mock 403 para importer.
- Cenários:
  1. Login ok → 200 + token
  2. Senha errada → 401
  3. Me sem token → 401
  4. Me com token → org/role corretos

## Rollout / risks

- Docker Postgres na porta 5433 (`docker-compose.yml`).
- Não expor seed passwords em produção.

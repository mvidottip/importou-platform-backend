# Technical Specification — Auth + Membership

## Executive Summary

Implementar módulo `auth` + wiring de `membership` / `role` / `user` / `organization` / `person` / `contact` para login JWT e autorização por role. **Referência técnica = BlockBR** (`block-technical-reference.mdc`): API → Application/CQRS → Domain → Infra. Sem Tenant: payload JWT `{ sub: userId, membershipId }`; guard resolve org + role.

## System Architecture

```
auth/
├── api/common/          → AuthAuthorizeGuard, AuthOutput, JwtPayload
├── api/public/          → AuthPublicController (authenticate)
├── application/public/  → AuthPublicAuthenticateCreateCommand + handler
├── domain/              → IAuthService
└── infra/               → AuthService (JWT)

user/
├── api/public/          → UserPublicController (GET /me)
├── application/public/  → UserPublicMeQuery + handler
└── infra/               → UserDataAccessObject
```

### Data flow

1. Authenticate: Contact(email) → Person → User → Membership ativa → valida password → JWT `{ sub, membershipId }` (MVP funde authorize Block).
2. Request: `AuthAuthorizeGuard` lê JWT → carrega Membership + Role + Organization → anexa em `request`.
3. `@Roles` compara `role.type` com metadata.

## Implementation Design

### JWT payload

```typescript
{ sub: string; membershipId: string }
```

### Roles decorator

```typescript
export const Roles = (...roles: RoleType[]) => SetMetadata("roles", roles);
```

### Endpoints (padrão Block)

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/public/auth/authenticate` | public | MVP: já emite token com membershipId |
| GET | `/public/user/me` | Bearer + AuthAuthorizeGuard | user + org + role |

Quando existir multi-membership: adicionar `POST /public/auth/authorize` como na Block.

### Seed (emails = front mock)

| Email | Role | Org type |
|-------|------|----------|
| admin@importou.com | admin | platform |
| importer@importou.com | importer | importer (+ radar active limited) |
| exporter@importou.com | exporter | exporter |
| broker@importou.com | broker | broker (+ license) |

Password: `importou` (só dev).

## Testing Strategy

- Manual (done 2026-07-29): authenticate 4 users; `/public/user/me`; senha errada / me sem token → 401.
- Cenários:
  1. Authenticate ok → `{ accessToken }`
  2. Senha errada → 401
  3. Me sem token → 401
  4. Me com token → `role` + `organization.type` corretos

## Rollout / risks

- Não expor seed passwords em produção.
- Front auth já na API; dados ainda mock até epic ImportOperation.

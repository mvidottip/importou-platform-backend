# Implementation Task Summary — Auth + Membership

> PRD: `prd.md` · Tech Spec: `techspec.md`

## Visão Geral

Auth JWT + Membership + seed demo (padrão Block: authenticate + user/me).

## Dependências

```
1.0 → 2.0 → 3.0 → 4.0 → 5.0
```

## Tasks

- [x] 1.0 Migrate inicial + seed script (roles, orgs, users, memberships, contacts)
- [x] 2.0 Domain repos mínimos (user/membership/organization/person/contact/role) via DatabaseModule
- [x] 3.0 AuthAuthorizeGuard + `@Roles` + `@MembershipCurrent`
- [x] 4.0 AuthenticateCommand + MeQuery (`POST /public/auth/authenticate`, `GET /public/user/me`)
- [x] 5.0 Smoke manual / documentar no README

## Status

**Epic concluído** (2026-07-29). Próximo: ImportOperation.

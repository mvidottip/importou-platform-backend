# Implementation Task Summary — Auth + Membership bootstrap

> PRD: `prd.md` · Tech Spec: `techspec.md`

## Visão Geral

Auth JWT + Membership + seed demo. Desbloqueia os demais epics.

## Dependências

```
1.0 → 2.0 → 3.0 → 4.0 → 5.0
```

## Tasks

- [ ] 1.0 Migrate inicial + seed script (roles, orgs, users, memberships, contacts)
- [ ] 2.0 Domain repos mínimos (user/membership/organization) ou PrismaService encapsulado
- [ ] 3.0 AuthAuthorizeGuard + `@Roles` + `@MembershipCurrent`
- [ ] 4.0 LoginCommand + MeQuery + AuthController
- [ ] 5.0 Smoke manual / testes do guard + documentar no README

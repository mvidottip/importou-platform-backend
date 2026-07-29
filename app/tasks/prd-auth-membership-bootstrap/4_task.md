# Task 4.0 — Authenticate + Me

## Goal

Endpoints públicos no padrão Block.

## Deliverables

- [x] `POST /public/auth/authenticate` → `{ accessToken }` com JWT `{ sub, membershipId }`
- [x] `GET /public/user/me` com `AuthAuthorizeGuard`
- [x] Controllers + CQRS handlers

## Notes

MVP funde authenticate+authorize da Block (1 membership por user). Front fica para depois.

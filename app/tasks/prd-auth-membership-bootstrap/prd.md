# PRD — Auth + Membership bootstrap

## Overview

Primeiro incremento do backend Importou: autenticação JWT com contexto de `Membership` (User ↔ Organization ↔ Role), alinhado ao padrão BlockBR **sem** Tenant. Sem isso, nenhum papel (importer/exporter/broker/admin) consegue operar a API com segurança.

## Goals

- Login por e-mail/senha retornando access token com `sub` (userId) + `membershipId`.
- Guard que resolve membership → organization → role e aplica `@Roles`.
- Seed demo compatível com o front mock (`*@importou.com`).
- Base para o loop `ImportOperation` no próximo epic.

Métricas de sucesso:
- 4 roles seedadas e logáveis.
- Request autenticada rejeita role errada (403) e aceita role certa (200 em health/me).

## User Stories

- Como importador, quero logar e ter meu contexto de organização importadora.
- Como admin, quero logar na org platform e acessar rotas backoffice.
- Como sistema, quero que endpoints sem `@Roles` ainda exijam auth quando guardado, ou públicos só se marcados.

## Core Features

### 1) Login / me

1. `POST /auth/login` com email + password → token + dados básicos.
2. `GET /auth/me` com Bearer → user, person, membership, organization, role.

### 2) Authorize

1. Guard carrega membership do JWT.
2. Decorator `@Roles(RoleType…)` filtra acesso.
3. Membership inativa / user blocked → 401/403.

### 3) Seed

1. Roles: admin, importer, exporter, broker.
2. Orgs: platform, importer demo, exporter demo, broker demo (CNPJ/licença/RADAR conforme tipo).
3. Users + Person + Membership + Contact email alinhados ao front.

## Out of Scope

- Refresh token / OAuth
- Invite multi-user
- KYB provider real / Serpro
- ImportOperation commands (próximo epic)

## Assumptions

- Password hash bcrypt.
- Um membership ativo por user no MVP (seed 1:1).
- Compliance fields na Organization já no schema; seed preenche status approved onde fizer sentido para demo.

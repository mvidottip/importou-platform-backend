# Importou — HANDOFF (contexto para novo chat)

Documento para continuar o trabalho sem depender do histórico do chat.  
Atualizado: 2026-07-29.

## Missão atual

Backend Nest + CQRS + Prisma (Organization, sem Tenant).  
**Epic auth concluído** (authenticate + me + smoke). Front: login na API real; demais dados ainda mock.  
Próximo foco = loop `ImportOperation` (`IMP-*`).

## Repos

| Repo | Path |
|------|------|
| Backend | `e:\Dev\b\imp\importou-platform-backend\` |
| Front | `e:\Dev\b\imp\importou-platform-frontend\` |
| Schema draft (espelho) | `importou-platform-frontend\docs\proposed-backend-schema.prisma` |
| Referência estrutura | BlockBR Nest/CQRS — **não** copiar domínio CVM/token/tenant |

## Decisões fechadas

### Identidade / acesso
- **Sem Tenant.** Boundary = `Organization` (`importer` \| `exporter` \| `broker` \| `platform`).
- **Membership**: `User` ↔ `Organization` ↔ `Role`. JWT `{ sub: userId, membershipId }`.
- Roles: `admin` \| `importer` \| `exporter` \| `broker` (compatíveis com `organization.type` no MVP 1:1).
- Endpoints: `POST /public/auth/authenticate` → `{ accessToken }`; `GET /public/user/me` (Bearer). Campo de papel no me = **`role`** (não duplicar `type` no user).

### Compliance (KYB / KYC)
- Gate forte na **Organization**, não no User.
- **Importador** = CNPJ + **RADAR**. Sem UBO/sócio no v1.
- **Despachante** = KYB light: CNPJ + licença RFB, sem RADAR.
- **Exportador** = `foreignTaxId` + country.
- **User/Person** = login PF; status: `invited` \| `active` \| `blocked` \| `deactivated`.

### Domínio de operação
- `referenceCode` tipo `IMP-2026-014`.
- Pai: `ImportOperation`. Filhos: `ExporterQuote`, `LandedCostEstimate`, `BrokerProposal`.

### Integrações
- Ports stubs: Pay, KYB, Radar em `app/src/infra/gateways/`.

## Auth — status

Epic `app/tasks/prd-auth-membership-bootstrap/` **done** (tasks 1–5).  
Smoke 2026-07-29: 4 logins + `/me` OK. Curls: `README.md`.

Demo: `*@importou.com` / senha `importou`.

Front: `auth.service` → API real; `USE_MOCK` só para dados (dashboard, imports, …).

## Backend (como subir)

```bash
cd e:\Dev\b\imp\importou-platform-backend
# opcional: docker compose up -d
cd app
yarn
yarn prisma:generate
yarn prisma:migrate
yarn prisma:seed
yarn start:dev
# GET /health · Swagger /docs
```

## Task harness + Cursor kit

| Item | Path |
|------|------|
| Tasks | `app/tasks/README.md` |
| Epic auth (done) | `app/tasks/prd-auth-membership-bootstrap/` |
| Cursor kit | `app/.cursor/README.md` |

## Próximos passos

1. ~~Auth + Membership~~ **done**
2. Epic loop **ImportOperation** (PRD → techspec → tasks)
3. Audit decorator
4. Front: desligar mock por domínio quando API existir
5. Adapters reais (KYB / Pay / Radar)

## Prompt sugerido

> Continua o backend Importou em `e:\Dev\b\imp\importou-platform-backend`.  
> Lê `HANDOFF.md`. Auth done. Próximo: epic ImportOperation (Organization, sem tenant). Yarn only. pt-br.

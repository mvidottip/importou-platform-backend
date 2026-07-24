# Importou — HANDOFF (contexto para novo chat)

Documento para continuar o trabalho sem depender do histórico do chat.  
Atualizado: 2026-07-23.

## Missão atual

Colocar a **Importou a rodar de verdade**: backend Nest + CQRS + Prisma no padrão estrutural do BlockBR, **sem** multi-tenant white-label.  
Front mock já existe; próximo foco = API real + auth + loop da operação `IMP-*`.

## Repos

| Repo | Path |
|------|------|
| Backend (skeleton) | `e:\Dev\b\importou-platform-backend\` |
| Front (mock + demo) | `e:\Dev\b\importou-platform-frontend\` |
| Schema draft (espelho) | `importou-platform-frontend\docs\proposed-backend-schema.prisma` |
| Referência estrutura | `e:\Dev\Block\bbr-aws-app-ecs-backend\` (só shell CQRS/Prisma — **não** copiar domínio CVM/token/tenant) |

Deploy front demo: fork pessoal `mvidottip/importou-platform-frontend` (remote `personal`). Org `Importou/...` exige Vercel paga.

## Decisões fechadas

### Identidade / acesso
- **Sem Tenant.** Boundary = `Organization` (`importer` \| `exporter` \| `broker` \| `platform`).
- **Membership** fica: `User` ↔ `Organization` ↔ `Role` (JWT futuro com `membershipId`).
- Roles: `admin` \| `importer` \| `exporter` \| `broker`.
- Role deve ser compatível com `organization.type` (seed 1:1 no MVP).

### Compliance (KYB / KYC)
- Gate forte na **Organization**, não no User.
- **Importador** = PJ obrigatória: CNPJ + **RADAR** (Serpro depois). Sem fluxo UBO/sócio no v1.
- **Despachante** = KYB light: CNPJ + licença RFB, **sem** RADAR (fila admin).
- **Exportador** = onboarding estrangeiro (`foreignTaxId` + country), **não** KYB BR.
- **User/Person** = login PF (`cpf` opcional); status leve: `invited` \| `active` \| `blocked` \| `deactivated`.

### Domínio de operação
- Um ID compartilhado nos 4 papéis: `referenceCode` tipo `IMP-2026-014`.
- Pai: `ImportOperation`.
- Filhos: `ExporterQuote`, `LandedCostEstimate`, `BrokerProposal` (states: draft/sent/accepted/rejected/superseded).
- Broker **não** usa fila `BRK-*` solta.

### Métricas / logs
- **Não** criar tabelas `Metric` / `MetricSnapshot` no v1.
- Block `origin/development` migrou métricas para **live-read** (Query + DAO / aggregate).
- Importou: KPIs = queries nas tabelas de negócio; rastreio = **Audit** (+ ingress/egress nas integrações).

### Integrações (agora = ports)
- `PaymentGateway`, `KybGateway`, `RadarGateway` — stubs em `app/src/infra/gateways/`.
- Ordem futura: KYB/docs → Pay → Serpro/RADAR.
- **Depois** (não agora): API partner / embed em corretora cambial. Preparar domínio sem acoplar UI; não modelar Tenant/partner no schema 1.

### O que NÃO vem da Block
Tenant, Offer/Investment/Token/Wallet, Suitability CVM, Metric persistida, machine de KYC pesada no User, PSP/BaaS no dia 0.

## Schema v1 (fica)

User, Person, Organization (+ radar*, foreignTaxId, licenseNumber), Role, Membership, OrganizationComplianceReview, Contact, Address, Document, File, ImportOperation, ExporterQuote, LandedCostEstimate, BrokerProposal, Audit, Idempotency.

Fonte canônica no backend:  
`app/src/infra/database/@prisma/schema.prisma`

## Front mock (já feito)

- Store compartilhado: `app/src/services/mock/operations.store.ts`
- Mesmo `IMP-*` em importer / exporter / broker / admin
- Importador aceita/recusa proposta do despachante
- Admin: fila KYC despachantes (`/admin/brokers`)
- Logins demo (senha qualquer):  
  `importer@importou.com` · `exporter@importou.com` · `broker@importou.com` (alias `despachante@…`) · `admin@importou.com`

## Backend skeleton (já feito)

Path: `e:\Dev\b\importou-platform-backend\`

- Nest 11 + CQRS + Prisma 6
- `docker-compose.yml` → Postgres `localhost:5433`
- Módulos vazios: auth, organization, membership, user, person, role, audit, import-operation, exporter-quote, broker-proposal, health
- Enums de domínio iniciais (RoleType, OrganizationType, ImportOperationStatus, Radar*, etc.)
- `yarn` + `prisma generate` + **`nest build` OK**
- Package manager: **sempre Yarn** (rule `.cursor/rules/package-manager.mdc`)
- Postgres local (pgAdmin) ou Docker — ver `DATABASE_URL` no `.env`
- Seed: `app/src/infra/database/seeds/` (`base.seed.sql` + `dev.seed.sql` + `index.ts`)

```bash
cd e:\Dev\b\imp\importou-platform-backend
# opcional: docker compose up -d
cd app
cp .env.example .env   # se precisar
yarn
yarn prisma:generate
yarn prisma:migrate
yarn prisma:seed
yarn start:dev
# GET /health · Swagger /docs
# Demo: *@importou.com / senha importou
```

## Task harness (padrão Block)

Copiado/adaptado:

| Item | Path |
|------|------|
| Como funciona | `app/tasks/README.md` |
| Templates | `app/tasks/_templates/` (`prd`, `techspec`, `tasks`, `N_task`) |
| 1º epic | `app/tasks/prd-auth-membership-bootstrap/` |
| Cursor rules | `.cursor/rules/` (`architecture`, `domain-compliance`, `task-harness`, `package-manager`, `commit-conventions`) |

Fluxo: **prd → techspec → tasks → N_task** (ler prd+techspec antes de cada task).

## Próximos passos (ordem sugerida)

1. Executar epic `prd-auth-membership-bootstrap` (migrate, seed, guard, login/me)
2. Novo epic: loop `ImportOperation` (criar pasta `prd-import-operation-loop` com prd/techspec/tasks)
3. Audit decorator
4. Ligar front mock → API (`USE_MOCK=false`)
5. Adapters reais (KYB / Pay / Radar) quando o loop estiver estável

## Prompt sugerido para o chat novo

> Continua o backend Importou em `e:\Dev\b\importou-platform-backend`.  
> Lê `HANDOFF.md`, `.cursor/rules/` e o epic `app/tasks/prd-auth-membership-bootstrap/`.  
> Estrutura Nest/CQRS estilo Block + harness prd/techspec/tasks, sem tenant.  
> Implementar pela ordem das tasks do epic auth.  
> Front mock em `e:\Dev\b\importou-platform-frontend`. Responda em pt-br.

## Transcript desta conversa (opcional)

Cursor agent transcripts do projeto Block/workspace — UUID aproximado da thread longa:  
`23f1e7ea-ed9d-48c6-b34e-b0f19d1a0a93`  
Prefira este HANDOFF + repos em vez do JSONL completo.

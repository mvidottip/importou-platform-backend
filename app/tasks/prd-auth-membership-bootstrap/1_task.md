# Tarefa 1.0: Migrate inicial + seed script

<critical>Ler o `prd.md` e o `techspec.md` desta pasta antes de implementar. Não implementar sem essa leitura.</critical>

## Visão Geral

Garantir schema aplicado no Postgres e popular dados demo alinhados ao front.

<requirements>
- `prisma migrate` cria todas as tabelas do schema Importou
- Seed idempotente (pode rodar 2x sem duplicar roles/emails)
- 4 roles, 4 orgs, 4 users + person + membership + contact email
- Password hash bcrypt para senha de dev documentada
</requirements>

## Subtarefas

- [ ] 1.1 Subir Postgres (`docker compose up -d`)
- [ ] 1.2 `yarn prisma:migrate` (nome ex.: `init`)
- [ ] 1.3 Criar `prisma/seed.ts` (ou `src/infra/database/seed.ts`) e wire no `package.json`
- [ ] 1.4 Seed roles / orgs / users conforme techspec
- [ ] 1.5 Documentar emails/senha no README

## Critérios de Sucesso

- [ ] Migrate ok
- [ ] Seed ok
- [ ] Consulta Prisma/SQL mostra 4 memberships ativas

## Arquivos relevantes

- `src/infra/database/@prisma/schema.prisma`
- `tasks/prd-auth-membership-bootstrap/techspec.md`

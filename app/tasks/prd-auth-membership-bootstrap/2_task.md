# Tarefa 2.0: Repositórios mínimos de identidade

<critical>Ler o `prd.md` e o `techspec.md` desta pasta antes de implementar.</critical>

## Visão Geral

Interfaces + implementações Prisma para buscar user por email (via Contact), membership por id, com role e organization.

<requirements>
- Find user+memberships by email contact
- Find membership by id including role + organization
- TypeIDs / enums existentes reutilizados
</requirements>

## Subtarefas

- [ ] 2.1 Interface(s) no domain ou data-access no infra
- [ ] 2.2 Mapper mínimo se necessário
- [ ] 2.3 Registrar providers nos modules

## Critérios de Sucesso

- [ ] Handlers de auth conseguem injetar e buscar dados
- [ ] Build passa

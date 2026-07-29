# Tarefa 5.0: Smoke + docs

<critical>Ler o `prd.md` e o `techspec.md` desta pasta antes de validar.</critical>

## Visão Geral

Validar o fluxo dos 4 logins e atualizar documentação.

<requirements>
- Smoke dos 4 emails demo
- README com curl exemplos
- Marcar tasks.md como concluídas quando ok
</requirements>

## Subtarefas

- [x] 5.1 Login admin/importer/exporter/broker
- [x] 5.2 Me em cada um
- [x] 5.3 Atualizar README + HANDOFF (status do epic)
- [ ] 5.4 (Opcional) teste unitário do guard — adiado

## Critérios de Sucesso

- [x] Fluxo auth utilizável pelo próximo epic (ImportOperation)

## Smoke (2026-07-29, local `:3000`)

| Email | role | organization.type |
|-------|------|-------------------|
| admin@importou.com | admin | platform |
| importer@importou.com | importer | importer |
| exporter@importou.com | exporter | exporter |
| broker@importou.com | broker | broker |

Também: senha errada → 401; `/me` sem Bearer → 401. Curls em `README.md` (raiz do backend).

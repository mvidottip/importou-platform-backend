# Task harness (padrão BlockBR)

Cada feature/epic vive em uma pasta sob `tasks/`:

```
tasks/
  prd-<slug>/
    prd.md          # o quê / por quê / user stories
    techspec.md     # como (arquitetura, schema, handlers, testes)
    tasks.md        # índice das tasks + dependências
    1_task.md       # fatia implementável
    2_task.md
    …
```

## Como usar (agente ou humano)

1. Escrever / atualizar `prd.md` (produto).
2. Escrever `techspec.md` alinhada ao Nest CQRS + schema Importou.
3. Quebrar em `N_task.md` via `tasks.md`.
4. Implementar **uma task por vez**, lendo sempre `prd.md` + `techspec.md` da pasta.
5. Marcar checkboxes; não pular o `<critical>` do topo da task.

## Templates

Ver `tasks/_templates/`.

## Regras Importou

- Sem Tenant / CVM / token blockchain.
- Compliance na `Organization` (importer = KYB+RADAR; broker = KYB light; exporter = onboarding estrangeiro).
- KPIs = live-read (DAO), não tabela Metric.
- Ver `HANDOFF.md` na raiz do repo e `.cursor/rules/`.

# Cursor kit — Importou

Guided workflow:

1. `/create-prd` → `/create-tech-spec` → `/create-task`
2. `/exec-task`
3. Agents: `handler-builder`, `task-planner`, `architecture-reviewer`, `code-reviewer`, `debugger`, `test-writer`

## Always-on rules

- `importou-domain.mdc`
- `block-technical-reference.mdc` — BlockBR como base técnica (auth `/public/auth/*` + `/public/user/me`, camadas Nest)
- `package-manager.mdc`
- `commit-conventions.mdc`

## Nest standards

`standard-architecture`, `standard-cqrs`, `standard-module`, `standard-persistence`, `standard-code-*`, `standard-test*` — Importou-only (Organization, no Tenant); estilo de código alinhado à Block.

## Hooks

`hooks.json`: shell guard, secrets guard, format-on-edit.

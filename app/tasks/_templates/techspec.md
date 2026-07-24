# Technical Specification — <Nome da feature>

## Executive Summary

<!-- 1–2 parágrafos: abordagem técnica. -->

## System Architecture

### Component Overview

```
<module>/
├── api/            → controllers (public | backoffice)
├── application/    → commands | queries | handlers | sagas
├── domain/         → entities, events, repository interfaces
└── infra/          → prisma repo, mapper, DAO
```

### Data flow

1. …
2. …

## Implementation Design

### Enums / status

```typescript
// …
```

### Prisma / models

<!-- Diff ou models novos. Seguir padrão isActive + status + TypeID. -->

### Domain

<!-- create / restore / toEvent / transitions -->

### Application (CQRS)

| Command / Query | Handler | Notas |
|-----------------|---------|-------|
| … | … | … |

### API

| Method | Path | Roles | Body / params |
|--------|------|-------|---------------|
| … | … | … | … |

### Integrações (ports)

- PaymentGateway / KybGateway / RadarGateway — só se necessário nesta feature.

## Testing Strategy

- Unit: …
- Integration / e2e: …
- Cenários:
  1. …
  2. …

## Rollout / risks

- …

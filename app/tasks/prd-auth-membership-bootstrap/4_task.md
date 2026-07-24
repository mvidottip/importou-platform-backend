# Tarefa 4.0: Login + Me (CQRS + controller)

<critical>Ler o `prd.md` e o `techspec.md` desta pasta antes de implementar.</critical>

## Visão Geral

Endpoints públicos de login e me.

<requirements>
- `POST /auth/login`
- `GET /auth/me` com guard
- Handlers via CommandBus/QueryBus
- Swagger documentado
</requirements>

## Subtarefas

- [ ] 4.1 Inputs/outputs
- [ ] 4.2 LoginCommand + handler
- [ ] 4.3 MeQuery + handler
- [ ] 4.4 AuthController
- [ ] 4.5 Wire AuthModule

## Critérios de Sucesso

- [ ] Login retorna token para seed users
- [ ] Me retorna org/role corretos

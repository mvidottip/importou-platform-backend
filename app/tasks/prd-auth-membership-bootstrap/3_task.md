# Tarefa 3.0: AuthAuthorizeGuard + @Roles + @MembershipCurrent

<critical>Ler o `prd.md` e o `techspec.md` desta pasta antes de implementar.</critical>

## Visão Geral

Portar o padrão de autorização da Block: JWT → membership → role check.

<requirements>
- Guard valida Bearer JWT
- Anexa user/membership/organization/role no request
- `@Roles(...)` retorna 403 se role não permitida
- Sem metadata de roles = qualquer autenticado passa
</requirements>

## Subtarefas

- [ ] 3.1 `role.decorator.ts`
- [ ] 3.2 `membership-current.decorator.ts`
- [ ] 3.3 `auth-authorize.guard.ts`
- [ ] 3.4 Exportar no AuthModule

## Critérios de Sucesso

- [ ] Guard testável / usado no `/auth/me`
- [ ] Build passa

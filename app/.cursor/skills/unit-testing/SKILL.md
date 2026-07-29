---
name: unit-testing
description: Unit tests for Importou entities/VOs/builders in __tests__/@unit/. Use when adding or improving unit tests.
---

# Unit Testing (Importou)

## Scope

`@unit` is **only** for entities, value objects, formatters and builders.

| Artifact | `@unit`? |
| -------- | -------- |
| Entity / VO | Yes |
| Formatter / pure builder | Yes |
| Handler, Service, Controller, DAO, Repo, Mapper, Guard | No → integration/e2e |

## Rules

1. No factory helpers (`makeSut` is for integration only).
2. Only real behavior (transitions, guards, VO validation) — not getters/`restore()`.
3. AAA with `// Arrange`, `// Act`, `// Assert`.
4. On exceptions: assert type **and** message (use enums in the message).
5. Every input is a named `const` in Arrange.
6. One behavior per `it`.

## Example

```typescript
describe("ImportOperation", () => {
  describe("cancel", () => {
    it("should transition to Cancelled", () => {
      // Arrange
      const operation = ImportOperation.create(/* required props */);

      // Act
      operation.cancel();

      // Assert
      expect(operation.status).toBe(ImportOperationStatus.Cancelled);
      expect(operation.deactivatedAt).toBeDefined();
    });

    it("should throw when already cancelled", () => {
      // Arrange
      const operation = ImportOperation.create(/* ... */);
      operation.cancel();
      const fn = () => operation.cancel();

      // Act & Assert
      expect(fn).toThrow(UnprocessableEntityException);
      expect(fn).toThrow(
        `Cannot cancel import operation in ${ImportOperationStatus.Cancelled} status`,
      );
    });
  });
});
```

Use `Id.create("importoperation")`, `Id.create("organization")`, etc. Never Tenant/Offer/Investment fixtures.

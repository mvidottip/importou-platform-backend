---
name: integration-test-high-level
description: Create mocked high-level integration tests for Services, Handlers, and Controllers using the makeSut pattern, model factories, and AAA structure.
---

# Integration Test (High-Level)

This skill guides the creation of high-level integration tests (Service, Handler, and Controller level) where external dependencies like repositories are mocked. It produces a test file that follows a standardized `makeSut` pattern and ensures data consistency using `faker` and model factories.

## When to Use This Skill

- When creating or updating a Service, Handler, or Controller.
- When asked to "create an integration test" for a business logic component.
- When testing the interaction between a high-level component and its repository dependencies.
- Do NOT use for testing low-level domain entity invariants (use `unit-testing-entities` instead).
- Do NOT use for tests that require a real database (e.g., Prisma + Postgres).

## Core Workflow

### Step 1: Discover Target and Dependencies

Identify the target component (Service, Handler, etc.) and its required dependencies (repositories, other services).

1. Find the component's module and ensure the test will be placed in `__tests__/@integration/[module]/`.
2. List all dependencies injected via the constructor.
3. Check for existing mocks in `__tests__/mocks/` (e.g., `mockContactRepository.ts`).
4. Check for existing model factories in `__tests__/fixtures/factory/model/` (e.g., `contact.model.ts`).

### Step 2: Prepare Missing Infrastructure

If any dependency lacks a mock or model factory, you MUST propose creating them first to maintain consistency.

| Category        | Pattern Name             | Location                                             |
| --------------- | ------------------------ | ---------------------------------------------------- |
| Repository Mock | `mock[Entity]Repository` | `__tests__/mocks/[entity].repository.mock.ts`        |
| Model Factory   | `[entity]Model`          | `__tests__/fixtures/factory/model/[entity].model.ts` |

### Step 3: Implement the `makeSut` Pattern

Create a helper function `makeSut` (System Under Test) that instantiates the component and returns both the SUT and its dependency spies.

```typescript
const makeSut = () => {
  const contactRepoSpy = mockContactRepository();
  const personRepoSpy = mockPersonRepository();
  const sut = new ContactService(contactRepoSpy, personRepoSpy);

  return {
    sut,
    contactRepoSpy,
    personRepoSpy,
  };
};
```

### Step 4: Write AAA Tests

Implement test cases using the Arrange-Act-Assert pattern. Use `faker` for all dynamic data.

1. **Arrange:** Set up the mocks' behavior using `mockResolvedValueOnce` or `mockRejectedValueOnce`.
2. **Act:** Call the method being tested.
3. **Assert:** Verify the result and check if dependencies were called correctly.

## Example

**Input:** Create an integration test for `ContactService.canUseContact`.

**Output produced:**

```typescript
import { faker } from "@faker-js/faker";
import { ContactType } from "@src/modules/contact/domain/contact.entity";
import { ContactService } from "@src/modules/contact/infra/contact.service";
import { contactModel } from "@test/fixtures/factory/model/contact.model";
import { mockContactRepository } from "@test/mocks/contact.repository.mock";

const makeSut = () => {
  const contactRepoSpy = mockContactRepository();
  // ... other mocks
  const sut = new ContactService(contactRepoSpy /* ... */);

  return { sut, contactRepoSpy };
};

describe("ContactService", () => {
  describe("canUseContact", () => {
    it("should return true when contact is not found", async () => {
      // Arrange
      const { sut, contactRepoSpy } = makeSut();
      const membership = membershipModel();
      contactRepoSpy.findByTypeAndValue.mockResolvedValueOnce(null);

      // Act
      const email = faker.internet.email();
      const result = await sut.canUseContact(membership, ContactType.Email, email);

      // Assert
      expect(result).toBe(true);
    });
  });
});
```

## Constraints

### MUST DO

- Use the `makeSut` factory pattern for every test file.
- Place integration tests in `__tests__/@integration/[module]/`.
- Use `// Arrange`, `// Act`, and `// Assert` comments.
- Use `faker` for all dynamic data (emails, names, values).
- Use `mock*Repository()` from the `__tests__/mocks/` folder.
- Use `*Model()` factories from the `__tests__/fixtures/factory/model/` folder.

### MUST NOT DO

- Instantiat the component directly inside `it` or `describe` (always use `makeSut`).
- Use real database connections (Prisma/TypeORM).
- Test low-level domain rules already covered by unit tests.
- Hardcode values that should be dynamic (e.g., specific UUIDs or fixed names).
- Test provider endpoints / gateway HTTP clients under `src/infra/gateways/providers/` (base services, capability services, builders) — **never**; see Golden Rule #2 in `standard-test.mdc`.

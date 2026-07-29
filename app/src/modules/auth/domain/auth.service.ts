import { Id } from "@src/shared/value-objects/id.value-object";

export type AuthTokenTtl = `${number}d` | `${number}h` | `${number}m` | `${number}s`;

export abstract class IAuthService {
  public abstract createAuthenticateToken(payload: Record<string, string>, expiresIn: AuthTokenTtl): string;
  public abstract ensureOrganizationAccess(requesterOrganizationId: Id, resourceOrganizationId: Id): void;
}

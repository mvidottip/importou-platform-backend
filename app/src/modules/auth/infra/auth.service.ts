import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenTtl, IAuthService } from "@src/modules/auth/domain/auth.service";
import { Id } from "@src/shared/value-objects/id.value-object";

@Injectable()
export class AuthService implements IAuthService {
  public constructor(private readonly jwtService: JwtService) {}

  public createAuthenticateToken(payload: Record<string, string>, expiresIn: AuthTokenTtl): string {
    const accessToken = this.jwtService.sign(payload, { expiresIn: expiresIn });
    return accessToken;
  }

  public ensureOrganizationAccess(requesterOrganizationId: Id, resourceOrganizationId: Id): void {
    const authorized = requesterOrganizationId.equals(resourceOrganizationId);

    if (!authorized) {
      throw new ForbiddenException("You are not allowed to access this resource");
    }
  }
}

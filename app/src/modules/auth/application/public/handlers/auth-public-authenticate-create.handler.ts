import { Logger, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthOutput } from "@src/modules/auth/api/common/auth.output";
import { AuthPublicAuthenticateCreateCommand } from "@src/modules/auth/application/public/commands/auth-public-authenticate-create.command";
import { IAuthService } from "@src/modules/auth/domain/auth.service";
import { ContactParentType } from "@src/modules/contact/domain/contact.entity";
import { IContactRepository } from "@src/modules/contact/domain/contact.repository";
import { IMembershipRepository } from "@src/modules/membership/domain/membership.repository";
import { IPersonRepository } from "@src/modules/person/domain/person.repository";
import { IUserRepository } from "@src/modules/user/domain/user.repository";

@CommandHandler(AuthPublicAuthenticateCreateCommand)
export class AuthPublicAuthenticateCreateHandler implements ICommandHandler<AuthPublicAuthenticateCreateCommand> {
  private readonly logger = new Logger(AuthPublicAuthenticateCreateHandler.name);

  public constructor(
    private readonly contactRepository: IContactRepository,
    private readonly personRepository: IPersonRepository,
    private readonly userRepository: IUserRepository,
    private readonly membershipRepository: IMembershipRepository,
    private readonly authService: IAuthService,
  ) {}

  public async execute(command: AuthPublicAuthenticateCreateCommand): Promise<AuthOutput> {
    try {
      const contact = await this.contactRepository.findEmailByValue(command.email);

      if (!contact || contact.parentType !== ContactParentType.Person) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const person = await this.personRepository.findByIdOrThrow(contact.parentId);
      const user = await this.userRepository.findByIdOrThrow(person.userId);

      if (user.isBlocked || !user.isActive) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const match = user.password.match(command.password);

      if (!match) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const membership = await this.membershipRepository.findActiveByUserIdOrThrow(user.id);
      const payload = {
        sub: user.id.value,
        membershipId: membership.id.value,
      };
      const accessToken = this.authService.createAuthenticateToken(payload, "7d");

      return { accessToken: accessToken };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}

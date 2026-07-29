import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthOutput } from "@src/modules/auth/api/common/auth.output";
import { AuthPublicAuthenticateCreateInput } from "@src/modules/auth/api/public/inputs/auth-public-authenticate-create.input";
import { AuthPublicAuthenticateCreateCommand } from "@src/modules/auth/application/public/commands/auth-public-authenticate-create.command";
import { toOutput } from "@src/utils/helpers/to-output.helper";
import {
  ApiBadRequestErrorOutput,
  ApiInternalServerErrorOutput,
  ApiUnauthorizedErrorOutput,
} from "@src/utils/types/api.output";

@ApiTags("auth")
@Controller("/public/auth")
export class AuthPublicController {
  public constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: "Authenticate user and issue access token with membership" })
  @ApiBadRequestResponse({ type: ApiBadRequestErrorOutput })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedErrorOutput })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorOutput })
  @Post("/authenticate")
  public async authenticate(@Body() input: AuthPublicAuthenticateCreateInput): Promise<AuthOutput> {
    const command = new AuthPublicAuthenticateCreateCommand(input.email, input.password);
    const authenticate = await this.commandBus.execute<AuthPublicAuthenticateCreateCommand, AuthOutput>(command);
    return toOutput(AuthOutput, authenticate);
  }
}

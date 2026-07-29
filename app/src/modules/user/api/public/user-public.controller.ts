import { Controller, Get, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthAuthorizeGuard } from "@src/modules/auth/api/common/auth-authorize.guard";
import { MembershipCurrent } from "@src/modules/membership/api/common/membership-current.decorator";
import { Membership } from "@src/modules/membership/domain/membership.entity";
import { UserMeOutput } from "@src/modules/user/api/common/user.output";
import { UserPublicMeQuery } from "@src/modules/user/application/public/queries/user-public-me.query";
import {
  ApiForbiddenErrorOutput,
  ApiInternalServerErrorOutput,
  ApiNotFoundErrorOutput,
  ApiUnauthorizedErrorOutput,
} from "@src/utils/types/api.output";

@ApiTags("user")
@Controller("/public/user")
export class UserPublicController {
  public constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user, membership, organization and role" })
  @ApiOkResponse({ type: UserMeOutput })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedErrorOutput })
  @ApiNotFoundResponse({ type: ApiNotFoundErrorOutput })
  @ApiForbiddenResponse({ type: ApiForbiddenErrorOutput })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorOutput })
  @UseGuards(AuthAuthorizeGuard)
  @Get("/me")
  public async me(@MembershipCurrent() membership: Membership): Promise<UserMeOutput> {
    const query = new UserPublicMeQuery(membership);
    const result = await this.queryBus.execute<UserPublicMeQuery, UserMeOutput>(query);
    return result;
  }
}

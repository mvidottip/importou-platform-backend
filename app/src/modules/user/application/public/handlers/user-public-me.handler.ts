import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserMeOutput } from "@src/modules/user/api/common/user.output";
import { UserPublicMeQuery } from "@src/modules/user/application/public/queries/user-public-me.query";
import { UserDataAccessObject } from "@src/modules/user/infra/user.data-access-object";

@QueryHandler(UserPublicMeQuery)
export class UserPublicMeHandler implements IQueryHandler<UserPublicMeQuery> {
  private readonly logger = new Logger(UserPublicMeHandler.name);

  public constructor(private readonly userDataAccessObject: UserDataAccessObject) {}

  public async execute(query: UserPublicMeQuery): Promise<UserMeOutput> {
    try {
      const result = await this.userDataAccessObject.me(query.membership);
      return result;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}

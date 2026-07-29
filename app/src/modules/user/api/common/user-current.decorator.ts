import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "@src/modules/user/domain/user.entity";

export const UserCurrent = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user as User;
});

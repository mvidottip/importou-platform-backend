import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthModule } from "@src/modules/auth/auth.module";
import { UserPublicController } from "@src/modules/user/api/public/user-public.controller";
import { UserPublicMeHandler } from "@src/modules/user/application/public/handlers/user-public-me.handler";

const handlers = [UserPublicMeHandler];

@Module({
  imports: [CqrsModule, AuthModule],
  controllers: [UserPublicController],
  providers: [...handlers],
})
export class UserModule {}

import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { EnvService } from "@src/infra/env/env.service";
import { AuthAuthorizeGuard } from "@src/modules/auth/api/common/auth-authorize.guard";
import { AuthPublicController } from "@src/modules/auth/api/public/auth-public.controller";
import { AuthPublicAuthenticateCreateHandler } from "@src/modules/auth/application/public/handlers/auth-public-authenticate-create.handler";
import { IAuthService } from "@src/modules/auth/domain/auth.service";
import { AuthService } from "@src/modules/auth/infra/auth.service";

const handlers = [AuthPublicAuthenticateCreateHandler];

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      inject: [EnvService],
      useFactory: (env: EnvService) => ({
        secret: env.jwtSecret,
        signOptions: { expiresIn: "7d" },
      }),
    }),
  ],
  controllers: [AuthPublicController],
  providers: [
    ...handlers,
    { provide: IAuthService, useClass: AuthService },
    AuthAuthorizeGuard,
  ],
  exports: [JwtModule, IAuthService, AuthAuthorizeGuard],
})
export class AuthModule {}

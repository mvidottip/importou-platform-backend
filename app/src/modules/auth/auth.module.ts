import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { EnvService } from "@src/infra/env/env.service";

/** Login + AuthAuthorizeGuard + @Roles — próximo incremento. */
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [EnvService],
      useFactory: (env: EnvService) => ({
        secret: env.jwtSecret,
        signOptions: { expiresIn: "7d" },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}

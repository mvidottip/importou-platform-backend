import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvService {
  public constructor(private readonly config: ConfigService) {}

  public get nodeEnv(): string {
    return this.config.get<string>("NODE_ENV", "development");
  }

  public get isProduction(): boolean {
    return this.nodeEnv === "production";
  }

  public get port(): number {
    return Number(this.config.get<string>("PORT", "3000"));
  }

  public get databaseUrl(): string {
    return this.config.getOrThrow<string>("DATABASE_URL");
  }

  public get jwtSecret(): string {
    return this.config.getOrThrow<string>("JWT_SECRET");
  }
}

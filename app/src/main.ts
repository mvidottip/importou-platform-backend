import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "@src/app.module";
import { EnvService } from "@src/infra/env/env.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors();
  app.enableShutdownHooks();

  const env = app.get(EnvService);

  if (!env.isProduction) {
    const config = new DocumentBuilder()
      .setTitle("Importou API")
      .setDescription("Backend Importou — skeleton CQRS")
      .setVersion("0.0.1")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
  }

  await app.listen(env.port);
}

bootstrap();

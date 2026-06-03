import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";

function parseAllowedOrigins() {
  const configuredOrigins = process.env.CORS_ALLOWED_ORIGINS ?? process.env.WEB_ORIGIN ?? "http://localhost:3000";
  return configuredOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  const httpServer = app.getHttpAdapter().getInstance() as { disable?: (setting: string) => void };
  httpServer.disable?.("x-powered-by");
  app.enableCors({
    origin: parseAllowedOrigins(),
    credentials: true
  });
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 4000);
}

void bootstrap();

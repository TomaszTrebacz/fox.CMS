import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT);
  Logger.log(
    `Api-gateway listening on http://localhost:${process.env.APP_PORT}/graphql`,
    'Bootstrap',
  );
}
bootstrap();

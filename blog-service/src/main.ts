import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { useContainer } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use pipe to format graphql errors
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        for (const error of errors.values()) {
          const response = error.constraints;
          for (const message in response) {
            return new BadRequestException(`${response[message]}`);
          }
        }
      },
      forbidUnknownValues: false,
    }),
  );

  // using service container allow inject dependencies in my custom validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.APP_PORT);

  Logger.log(
    `Blog-service listening on http://localhost:${process.env.APP_PORT}/graphql`,
    'Bootstrap',
  );
}
bootstrap();

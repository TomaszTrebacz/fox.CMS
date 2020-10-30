import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        USER_PORT: Joi.number(),
        BLOG_PORT: Joi.number(),
      }),
    }),
    GraphQLGatewayModule.forRoot({
      server: {
        cors: true,
      },
      gateway: {
        serviceList: [
          {
            name: 'user',
            url: `http://localhost:${process.env.USER_PORT}/graphql`,
          },
          {
            name: 'blog',
            url: `http://localhost:${process.env.BLOG_PORT}/graphql`,
          },
        ],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

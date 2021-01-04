import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { DateScalar } from './shared';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { TwilioModule } from 'nestjs-twilio';
import { SmsModule } from './sms/sms.module';
import { MailmanModule } from '@squareboat/nest-mailman';

import {
  GqlConfigService,
  databaseConfig,
  jwtConfig,
  mailConfig,
  redisConfig,
  twilioConfig,
} from './config';

// for testing purposes app can manage different env files
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      isGlobal: true,
      load: [mailConfig, twilioConfig, databaseConfig, redisConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    GraphQLFederationModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    TwilioModule.forRootAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => config.get('twilio'),
      inject: [ConfigService],
    }),
    MailmanModule.registerAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => config.get('mailman'),
      inject: [ConfigService],
    }),
    MailModule,
    UsersModule,
    AuthModule,
    SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar, ConfigService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { RedisModule } from 'nestjs-redis';
import { DateScalar } from './shared/date.scalar';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { TwilioModule } from 'nestjs-twilio';
import { SmsModule } from './sms/sms.module';
import { RedisDbModule } from './redis-db/redis-db.module';
import { MailmanModule } from '@squareboat/nest-mailman';

import { GqlConfigService } from './config/gql.config';
import mailConfig from './config/mail.config';
import twilioConfig from './config/twilio.config';
import databaseConfig from './config/database.config';
import redisConfig from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mailConfig, twilioConfig, databaseConfig, redisConfig],
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
    RedisModule.forRootAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => config.get('redis'),
      inject: [ConfigService],
    }),
    MailModule,
    UsersModule,
    AuthModule,
    SmsModule,
    RedisDbModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}

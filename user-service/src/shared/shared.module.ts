import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailmanModule } from '@squareboat/nest-mailman';
import { TwilioModule } from 'nestjs-twilio';
import { mailConfig, twilioConfig } from 'src/config';
import { MailModule } from './mail/mail.module';
import { DateScalar } from './scalars/date.scalar';
import { SmsModule } from './sms/sms.module';

// for testing purposes app can manage different env files
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      isGlobal: true,
      load: [mailConfig, twilioConfig],
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
    SmsModule,
    SharedModule,
  ],
  providers: [DateScalar],
  exports: [SmsModule, MailModule],
})
export class SharedModule {}

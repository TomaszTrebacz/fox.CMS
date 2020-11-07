import { Module } from '@nestjs/common';
import { MailmanModule } from '@squareboat/nest-mailman';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailmanModule.register({
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      username: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
      from: process.env.MAIL_SENDER_ID,
      path: process.env.MAIL_PATH,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

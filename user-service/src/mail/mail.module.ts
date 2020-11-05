import { Module } from '@nestjs/common';
import { MailmanModule } from '@squareboat/nest-mailman';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailmanModule.register({
      host: 'smtp.mailtrap.io',
      port: 2525,
      username: '4221e1429d652b',
      password: 'dda98f01422614',
      from: 'sender@emailaddress.com',
      path: '/project-dir/resources/mails',
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

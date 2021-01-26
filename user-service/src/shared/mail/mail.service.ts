import { Mailman, MailMessage } from '@squareboat/nest-mailman';
import { mailInterface } from './mail.interface';

export class MailService {
  sendMail(mail: mailInterface) {
    const buildMail = MailMessage.init()
      .greeting(mail.greeting)
      .line(mail.content)
      .subject(mail.subject);

    Mailman.init()
      .to(mail.mailAddress)
      .send(buildMail);
  }
}

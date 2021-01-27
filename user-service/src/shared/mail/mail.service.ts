import { Mailman, MailMessage } from '@squareboat/nest-mailman';
import { mailInterface } from './mail.interface';

export class MailService {
  async sendMail(mail: mailInterface): Promise<void> {
    try {
      const buildMail = MailMessage.init()
        .greeting(mail.greeting)
        .line(mail.content)
        .subject(mail.subject);

      await Mailman.init()
        .to(mail.mailAddress)
        .send(buildMail);
    } catch (err) {
      throw new Error(`Can not send mail: ${err.message}`);
    }
  }
}

import { registerAs } from '@nestjs/config';
import { MailmanOptions } from '@squareboat/nest-mailman';

export default registerAs('mailman', () => {
  return {
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_SENDER_ID,
    path: process.env.MAIL_PATH,
  } as MailmanOptions;
});

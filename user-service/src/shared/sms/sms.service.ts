import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { smsInterface } from './sms.interface';

@Injectable()
export class SmsService {
  public constructor(@InjectTwilio() private readonly client: TwilioClient) {}

  async sendSMS(smsData: smsInterface): Promise<void> {
    try {
      await this.client.messages.create({
        body: smsData.body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: smsData.phoneNumber,
      });
    } catch (err) {
      throw new Error(`Can not send SMS: ${err.message}`);
    }
  }
}

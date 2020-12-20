import { registerAs } from '@nestjs/config';

export const twilioConfig = registerAs('twilio', () => ({
  accountSid: process.env.TWILIO_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
}));

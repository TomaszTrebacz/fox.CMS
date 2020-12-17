import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.ACCESS_JWT_SECRET,
  signOptions: { expiresIn: process.env.ACCESS_JWT_EXP },
}));

import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.ACCESS_JWT_SECRET,
  signOptions: { expiresIn: process.env.ACCESS_JWT_EXP },
}));

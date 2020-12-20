import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  db: parseInt(process.env.REDIS_DB),
  password: process.env.REDIS_PASSWORD,
}));

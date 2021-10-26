import { registerAs } from '@nestjs/config';

export default registerAs('postgres', () => ({
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  db: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
}));

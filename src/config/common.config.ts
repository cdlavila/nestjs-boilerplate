import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
}));

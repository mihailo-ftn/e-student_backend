import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as connectRedis from 'connect-redis';
import * as cors from 'cors';
import Redis from 'ioredis';
import * as session from 'express-session';
import { COOKIE_NAME, __prod__ } from './constants';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const RedisStore = connectRedis(session);
  const redis = new Redis({ port: 6379, host: 'redis' });

  // app.use(
  //   helmet({
  //     contentSecurityPolicy: false,
  //   }),
  // );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, //Change before prod to 30 minutes
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: 'rewrqwerqewrqwrqvvsdabhdfer',
      resave: false,
    }),
  );

  await app.listen(4000);
}
bootstrap();

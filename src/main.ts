import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as config from 'config';
import { IServerConfig } from './config/interfaces';
import { join } from 'path';

const serverConfig: IServerConfig = config.get('server');
// hello
async function bootstrap() {
  // for github test
  const logger = new Logger(`bootstrap`, true);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // if (process.env.NODE_ENV === 'development') {
  //   app.enableCors();
  // } else {
  //   logger.log(`Accepting requests from origin ${serverConfig.origin}`);
  //   app.enableCors({
  //     origin: serverConfig.origin,
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //     allowedHeaders: 'Content-Type, Accept',
  //   });
  // }
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:
      'Content-Type, Accept,Authorization,Access-Control-Allow-Methods,Access-Control-Request-Headers',
  });
  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`nest app is running on port ${port}`);
}
bootstrap();

// nestjs-ts-chat.ap-southeast-2.elasticbeanstalk.com

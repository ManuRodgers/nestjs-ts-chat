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
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: serverConfig.origin,
    });
    logger.log(`Accepting requests from origin ${serverConfig.origin}`);
  }
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

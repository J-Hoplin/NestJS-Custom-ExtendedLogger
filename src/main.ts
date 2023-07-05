import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './logger/logger.service';

async function bootstrap() {
  const mode = 'dev';
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();

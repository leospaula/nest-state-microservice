import { NestFactory } from '@nestjs/core';
import { StateModule } from './state.module';
import { Logger } from '@nestjs/common';
import { natsConfig } from './nats.config';

async function bootstrap() {
  const logger = new Logger('Main:bootstrap:StatesMicroservice');
  const app = await NestFactory.createMicroservice(StateModule, natsConfig);

  app.listen(() => logger.verbose('Microservice is listening...'));
}
bootstrap();

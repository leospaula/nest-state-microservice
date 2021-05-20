import { NestFactory } from '@nestjs/core';
import { StateModule } from './state.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main:bootstrap:StatesMicroservice');
  const app = await NestFactory.createMicroservice(StateModule, {
    transport: Transport.NATS,
    options: {
      queue: 'microservice',
      url: 'nats://localhost:4222',
    },
  });
  app.listen(() => logger.verbose('Microservice is listening...'));
}
bootstrap();

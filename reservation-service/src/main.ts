import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const configService = new ConfigService();
  const port = configService.get<string>('RESERVATION_PORT');
  const hostTCP = configService.get<string>('RESERVATION_TCP_HOST');
  const portTCP = configService.get<string>('RESERVATION_TCP_PORT');

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: hostTCP,
      port: portTCP,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
  console.log(`Reservation Service is running on: ${await app.getUrl()}`);
}
bootstrap();

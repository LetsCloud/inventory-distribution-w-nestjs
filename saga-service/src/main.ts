import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const configService = new ConfigService();
  const hostTCP = configService.get<string>('SAGA_TCP_HOST');
  const portTCP = configService.get<number>('SAGA_TCP_PORT');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: hostTCP,
        port: portTCP,
      },
    },
  );
  await app.listen();
  console.log(
    `Saga Service TCP transport is running on URL: ${hostTCP}:${portTCP}`,
  );
}
bootstrap();

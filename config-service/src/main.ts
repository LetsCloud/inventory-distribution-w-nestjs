import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const configService = new ConfigService();
  const port = configService.get<string>('CONFIG_PORT');
  const hostTCP = configService.get<string>('CONFIG_TCP_HOST');
  const portTCP = configService.get<string>('CONFIG_TCP_PORT');

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
  console.log(`Config Service is running on: ${await app.getUrl()}`);
}
bootstrap();

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupProxies } from './midleware/proxy';
import { ROUTES } from './midleware/routes';

async function bootstrap() {
  const configService = new ConfigService();
  const port = configService.get<string>('GATEWAY_PORT');
  const reservationUrl = configService.get<string>('RESERVATION_URL');
  console.log('RESERVATION_URL=', reservationUrl);

  const app = await NestFactory.create(AppModule);

  const r = ROUTES.map((i) => {
    if (i.url.includes('reservation')) {
      const x = {
        ...i,
        proxy: {
          ...i.proxy,
          target: reservationUrl,
          pathRewrite: { ...i.proxy.pathRewrite },
        },
      };
      return x;
    } else {
      return i;
    }
  });
  //  console.log('r=', r);
  setupProxies(app, r);

  await app.listen(port);
  console.log(`Gateway Service is running on: ${await app.getUrl()}`);
}

bootstrap();

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientsModuleOptionsFactory,
  TcpClientOptions,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ReservationClientConfig implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createClientOptions(): TcpClientOptions {
    const host = this.configService.get<string>('RESERVATION_TCP_HOST');
    const port = this.configService.get<number>('RESERVATION_TCP_PORT');
    return {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    };
  }
}

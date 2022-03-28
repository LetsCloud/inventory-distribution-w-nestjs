import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientsModuleOptionsFactory,
  TcpClientOptions,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class SagaClientConfigService implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createClientOptions(): TcpClientOptions {
    const host = this.configService.get<string>('SAGA_TCP_HOST');
    const port = this.configService.get<number>('SAGA_TCP_PORT');
    return {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    };
  }
}

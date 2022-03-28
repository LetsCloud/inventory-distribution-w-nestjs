import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientsModuleOptionsFactory,
  TcpClientOptions,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class InventoryClientConfig implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createClientOptions(): TcpClientOptions {
    const host = this.configService.get<string>('INVENTORY_TCP_HOST');
    const port = this.configService.get<number>('INVENTORY_TCP_PORT');
    return {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    };
  }
}

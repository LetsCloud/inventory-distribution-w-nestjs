import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SRV_INVENTORY, SRV_RESERVATION } from './gateway.constanst';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SRV_RESERVATION,
        transport: Transport.TCP,
        options: { port: 3001 },
      },
      {
        name: SRV_INVENTORY,
        transport: Transport.TCP,
        options: { port: 3002 },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [],
})
export class GatewayModule {}

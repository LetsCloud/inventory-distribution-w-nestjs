import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { CommandHandlers } from './commands/handlers';
import { InventoryClientConfig } from './config/inventory-client.config';
import { ReservationClientConfig } from './config/reservation-client.config';
import { CreateReservationSaga } from './create-reservation.saga';
import { SRV_INVENTORY, SRV_RESERVATION } from './saga.constants';
import { SagasController } from './sagas.controller';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      {
        useClass: ReservationClientConfig,
        name: SRV_RESERVATION,
      },
      {
        useClass: InventoryClientConfig,
        name: SRV_INVENTORY,
      },
    ]),
  ],
  controllers: [SagasController],
  providers: [CreateReservationSaga, ...CommandHandlers],
})
export class SagasModule {}

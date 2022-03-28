import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ClientsModule } from '@nestjs/microservices';
import { SRV_SAGA } from './reservation.constants';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { SagaClientConfig } from './config/saga-client.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    ClientsModule.registerAsync([
      {
        useClass: SagaClientConfig,
        name: SRV_SAGA,
      },
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}

import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { SagaClientConfigService } from './config/saga-client.config.service';
import { SRV_SAGA } from './rooms.constants';
import { RoomsController } from './rooms.controller';
import { RoomsRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';
import { Room, RoomSchema } from './schemas/room.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    ClientsModule.registerAsync([
      {
        useClass: SagaClientConfigService,
        name: SRV_SAGA,
      },
    ]),
  ],

  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository],
})
export class RoomsModule {}

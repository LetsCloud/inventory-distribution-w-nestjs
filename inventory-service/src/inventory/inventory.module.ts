import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { SagaClientConfigService } from 'src/inventory/config/saga-client.config';
import { SRV_SAGA } from './inventory.constants';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';
import {
  InventoryChange,
  InventoryChangeSchema,
} from './schemas/inventory-change.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InventoryChange.name, schema: InventoryChangeSchema },
    ]),

    ClientsModule.registerAsync([
      {
        useClass: SagaClientConfigService,
        name: SRV_SAGA,
      },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository],
})
export class InventoryModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryChangeDto } from './dtos/invetory-change.dto';
import {
  InventoryChange,
  InventoryChangeDocument,
} from './schemas/inventory-change.schema';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectModel(InventoryChange.name)
    private inventoryChangeModel: Model<InventoryChangeDocument>,
  ) {}

  async create(dto: InventoryChangeDto) {
    console.log('InventoryRepository->create->dto=', dto);
    const inventoryChange = await this.inventoryChangeModel.create(dto);
    console.log(
      'InventoryRepository->create->inventoryChange=',
      inventoryChange,
    );
    return inventoryChange;
  }

  async getTotalRooms(
    propertyId: string,
    roomTypeId: string,
    arrival: Date,
    departure: Date,
  ): Promise<any> {
    console.log('InventoryRepository->getTotalRooms->propertyId=', propertyId);
    console.log('InventoryRepository->getTotalRooms->roomTypeId=', roomTypeId);
    console.log('InventoryRepository->getTotalRooms->arrival=', arrival);
    console.log('InventoryRepository->getTotalRooms->departure=', departure);
    const rooms = this.inventoryChangeModel.aggregate([
      {
        $match: {
          $and: [
            { propertyId: propertyId },
            { roomTypeId: roomTypeId },
            {
              inventoryDate: {
                $gte: new Date(arrival),
              },
            },
            {
              inventoryDate: {
                $lt: new Date(departure),
              },
            },
          ],
        },
      },
      {
        $project: {
          day: '$inventoryDate',
          vacant: '$rooms',
        },
      },
      {
        $group: {
          _id: '$day',
          total: { $sum: '$vacant' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    console.log('InventoryRepository->getTotalRooms->rooms=', rooms);
    return rooms;
  }
}

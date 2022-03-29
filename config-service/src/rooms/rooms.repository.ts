import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Room, RoomDocument } from './schemas/room.shema';

@Injectable()
export class RoomsRepository {
  constructor(
    @InjectModel(Room.name)
    private model: Model<RoomDocument>,
  ) {}

  async create(room: Room): Promise<Room> {
    return this.model.create(room);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<Room>,
    room: Partial<Room>,
  ): Promise<Room> {
    return this.model.findOneAndUpdate(filterQuery, room, {
      new: true,
    });
  }

  async findById(id: string): Promise<Room> {
    const result = await this.model.findById(id);
    return result;
  }

  async findOne(filterQuery: FilterQuery<Room>): Promise<Room> {
    const result = await this.model.findOne(filterQuery);
    return result;
  }

  async find(filterQuery: FilterQuery<Room>): Promise<Room[]> {
    const result = await this.model.find(filterQuery);
    return result;
  }
}

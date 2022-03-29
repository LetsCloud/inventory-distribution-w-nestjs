import { Injectable } from '@nestjs/common';
import { RoomDto } from './dto/room.dto';
import { RoomsRepository } from './rooms.repository';
import { Room } from './schemas/room.shema';

@Injectable()
export class RoomsService {
  constructor(private readonly repository: RoomsRepository) {}

  async createRoom(dto: RoomDto): Promise<Room> {
    return await this.repository.create({ ...dto, active: false });
  }

  async getRoomById(id: string): Promise<Room> {
    return await this.repository.findById(id);
  }

  async getAllRoom(): Promise<Room[]> {
    return await this.repository.find({});
  }
}

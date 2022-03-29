import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RoomDto } from './dto/room.dto';
import { SRV_SAGA } from './rooms.constants';
import { RoomsService } from './rooms.service';
import { Room } from './schemas/room.shema';

@Controller('rooms')
export class RoomsController {
  constructor(
    private service: RoomsService,
    @Inject(SRV_SAGA)
    private readonly sagaClient: ClientProxy,
  ) {}

  @Post()
  createRoom(@Body() dto: RoomDto) {
    console.log('createRoom', dto);
    return this.service.createRoom(dto);
  }

  @Get(':id')
  getRoomById(@Param('id') id: string): Promise<Room> {
    return this.service.getRoomById(id);
  }

  @Get()
  getAllRoom(): Promise<Room[]> {
    return this.service.getAllRoom();
  }
}

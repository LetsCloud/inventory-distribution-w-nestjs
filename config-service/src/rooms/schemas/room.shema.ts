import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ type: String, required: true })
  propertyId: string;
  @Prop({ type: String, required: true })
  roomTypeId: string;
  @Prop({ type: String, required: true })
  roomNo: string;
  @Prop({ type: Boolean, required: true })
  active: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

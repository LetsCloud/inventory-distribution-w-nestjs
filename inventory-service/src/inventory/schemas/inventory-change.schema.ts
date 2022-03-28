import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InventoryChangeDocument = InventoryChange & Document;

@Schema()
export class InventoryChange {
  @Prop({ type: String, required: true })
  propertyId: string;
  @Prop({ type: String, required: true })
  roomTypeId: string;
  @Prop({ type: Number, required: true })
  rooms: number;
  @Prop({ type: Date, required: true })
  inventoryDate: Date;
  @Prop({ type: Date, required: true })
  transactionTime: Date;
  @Prop({ type: String, required: true })
  transactionType: string;
  @Prop({ type: String })
  reference: string;
}

export const InventoryChangeSchema =
  SchemaFactory.createForClass(InventoryChange);

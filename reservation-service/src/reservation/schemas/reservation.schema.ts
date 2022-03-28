import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ type: String, required: true })
  propertyId: string;
  @Prop({ type: String, required: true })
  roomTypeId: string;
  @Prop({ type: Date, required: true })
  arrival: Date;
  @Prop({ type: Date, required: true })
  departure: Date;
  @Prop({ type: Number, required: true })
  rooms: number;
  @Prop({ type: String, required: true })
  status: string;
  @Prop({ type: String, index: true })
  transactionId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

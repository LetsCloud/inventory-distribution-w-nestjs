import { Injectable } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { Reservation } from './schemas/reservation.schema';

@Injectable()
export class ReservationService {
  constructor(private readonly repository: ReservationRepository) {}

  async getReservationById(transactionId: string): Promise<Reservation> {
    console.log('getReservationById', transactionId);
    return this.repository.findOne({ transactionId });
  }

  async getReservationById2(id: string): Promise<Reservation> {
    console.log('ReservationService->getReservationById2->id=', id);
    return this.repository.findById(id);
  }
  async getReservations(): Promise<Reservation[]> {
    return this.repository.find({});
  }

  async createReservation(dto: ReservationDto): Promise<Reservation> {
    return this.repository.create(dto);
  }

  async updateReservation(dto: ReservationDto): Promise<Reservation> {
    const transactionId = dto.transactionId;
    return this.repository.findOneAndUpdate({ transactionId }, dto);
  }
}

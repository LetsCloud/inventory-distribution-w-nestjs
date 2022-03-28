import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Reservation, ReservationDocument } from './schemas/reservation.schema';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(reservation: Reservation): Promise<Reservation> {
    return this.reservationModel.create({
      ...reservation,
      status: 'PENDING',
    });
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<Reservation>,
    reservation: Partial<Reservation>,
  ): Promise<Reservation> {
    console.log('findOneAndUpdate');
    console.log(filterQuery);
    console.log(reservation);
    return this.reservationModel.findOneAndUpdate(filterQuery, reservation, {
      new: true,
    });
  }

  async findById(id: string): Promise<Reservation> {
    console.log('ReservationRepository->findById->id=', id);
    const result = await this.reservationModel.findById(id);
    return result;
  }

  async findOne(
    reservationFilterQuery: FilterQuery<Reservation>,
  ): Promise<Reservation> {
    const result = await this.reservationModel.findOne(reservationFilterQuery);
    return result;
  }

  async find(
    reservationFilterQuery: FilterQuery<Reservation>,
  ): Promise<Reservation[]> {
    const result = await this.reservationModel.find(reservationFilterQuery);
    console.log('ReservationRepository->find->result=', result);
    return result;
  }
}

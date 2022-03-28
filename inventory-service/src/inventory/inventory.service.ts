import { Injectable } from '@nestjs/common';
import { InventoryChangeDto } from './dtos/invetory-change.dto';
import { CheckAvailabilityEvent } from './events/check-availability.event';
import { AvailableRoomsByDate } from './inventory.model';
import { InventoryRepository } from './inventory.repository';

@Injectable()
export class InventoryService {
  constructor(private repository: InventoryRepository) {}

  // ***************************
  // ***************************
  // ***************************
  async checkAvailability(event: CheckAvailabilityEvent): Promise<Date[]> {
    const unavailableDates: Date[] = await this.checkAvailableRooms(
      event.propertyId,
      event.roomTypeId,
      event.arrival,
      event.departure,
      event.rooms,
    );
    console.log('checkAvailability->unavailableDates=', unavailableDates);
    if (unavailableDates.length !== 0) {
      return unavailableDates;
    }

    await this.createInventoryChanges(
      event.propertyId,
      event.roomTypeId,
      event.rooms,
      event.arrival,
      event.departure,
      'RESERVATION',
    );

    const unavailableDates2: Date[] = await this.checkAvailableRooms(
      event.propertyId,
      event.roomTypeId,
      event.arrival,
      event.departure,
      0,
    );
    if (unavailableDates2.length !== 0) {
      await this.createInventoryChanges(
        event.propertyId,
        event.roomTypeId,
        event.rooms,
        event.arrival,
        event.departure,
        'RESERVATION',
      );
      return unavailableDates2;
    }
    return [];
  }
  // ***************************
  // ***************************
  // ***************************
  async createInventoryChanges(
    propertyId: string,
    roomTypeId: string,
    rooms: number,
    arrival: Date,
    departure: Date,
    transactionType: string,
  ) {
    const transactionTime = new Date();
    const tempDate = new Date(arrival);
    const endDate = new Date(departure);
    while (tempDate <= endDate) {
      await this.repository.create(
        new InventoryChangeDto(
          propertyId,
          roomTypeId,
          rooms,
          tempDate,
          transactionTime,
          transactionType,
          '',
        ),
      );
      tempDate.setDate(tempDate.getDate() + 1);
    }
  }

  // ***************************
  // ***************************
  // ***************************
  async checkAvailableRooms(
    propertyId: string,
    roomTypeId: string,
    arrival: Date,
    departure: Date,
    rooms: number,
  ): Promise<Date[]> {
    const availableRooms: AvailableRoomsByDate[] =
      await this.repository.getTotalRooms(
        propertyId,
        roomTypeId,
        arrival,
        departure,
      );

    const unavailableDates: Date[] = [];
    const tempDate = new Date(arrival);
    const endDate = new Date(departure);
    while (tempDate < endDate) {
      const availableDay = availableRooms.find((item) => {
        return item._id.getTime() === tempDate.getTime();
      });
      if (!availableDay || availableDay.total < rooms) {
        unavailableDates.push(new Date(tempDate));
      }
      tempDate.setDate(tempDate.getDate() + 1);
    }

    return unavailableDates;
  }
}

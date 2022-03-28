import { Controller } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';
import { FailedAvailabilityCheckEvent } from './events/failed-availability-check.event';
import { ReservationCreatedEvent } from './events/reservation-created.event';
import { SuccessfulAvailabilityCheckEvent } from './events/successful-availability-check.event';
import {
  EVENT_FAILED_AVAILABILITY_CHECK,
  EVENT_RESERVATION_CREATED,
  EVENT_SUCCESSFUL_AVAILABILITY_CHECK,
} from './saga.constants';

@Controller('sagas')
export class SagasController {
  constructor(private readonly eventBus: EventBus) {}

  @EventPattern(EVENT_RESERVATION_CREATED)
  handlesReservationCreatedEvent(event: ReservationCreatedEvent) {
    console.log('handlesReservationCreatedEvent', event);
    this.eventBus.publish(
      new ReservationCreatedEvent(
        event.transactionId,
        event.status,
        event.propertyId,
        event.roomTypeId,
        event.arrival,
        event.departure,
        event.rooms,
      ),
    );
  }

  @EventPattern(EVENT_SUCCESSFUL_AVAILABILITY_CHECK)
  handlesSuccessfulAvailabliltyCheckEvent(
    event: SuccessfulAvailabilityCheckEvent,
  ) {
    console.log('handlesSuccessfulAvailabliltyCheckEvent', event);
    this.eventBus.publish(
      new SuccessfulAvailabilityCheckEvent(
        event.transactionId,
        event.status,
        event.propertyId,
        event.roomTypeId,
        event.arrival,
        event.departure,
        event.rooms,
      ),
    );
  }

  @EventPattern(EVENT_FAILED_AVAILABILITY_CHECK)
  handlesFailedAvailabilityCheckEvent(event: FailedAvailabilityCheckEvent) {
    console.log('handlesFailedAvailabilityCheckEvent', event);
    this.eventBus.publish(
      new FailedAvailabilityCheckEvent(
        event.transactionId,
        event.status,
        event.propertyId,
        event.roomTypeId,
        event.arrival,
        event.departure,
        event.rooms,
      ),
    );
  }
}

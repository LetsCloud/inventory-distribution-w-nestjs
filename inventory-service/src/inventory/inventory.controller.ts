import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import {
  EVENT_CHECK_AVAILABILITY,
  EVENT_FAILED_AVAILABILITY_CHECK,
  EVENT_SUCCESSFUL_AVAILABILITY_CHECK,
  SRV_SAGA,
} from './inventory.constants';
import { CheckAvailabilityEvent } from './events/check-availability.event';
import { InventoryService } from './inventory.service';
import { SuccessfulAvailabliltyCheckEvent } from './events/succesful-availability-check.event';
import { FailedAvailabliltyCheckEvent } from './events/failed-availability-check.event';

@Controller()
export class InventoryController {
  constructor(
    private service: InventoryService,
    @Inject(SRV_SAGA)
    private readonly sagaClient: ClientProxy,
  ) {}

  @EventPattern(EVENT_CHECK_AVAILABILITY)
  async handleCheckAvailabilityEvent(event: CheckAvailabilityEvent) {
    const unavailableDays = await this.service.checkAvailability(event);
    if (unavailableDays.length === 0) {
      console.log(
        'CheckAvailabilityCommandHandler->execute->emit(SuccessfulAvailabliltyCheckEvent)',
      );
      //      await this.service.createInventoryChanges(command, 'RESERVATION');

      this.sagaClient.emit(
        EVENT_SUCCESSFUL_AVAILABILITY_CHECK,
        new SuccessfulAvailabliltyCheckEvent(
          event.transactionId,
          event.status,
          event.propertyId,
          event.roomTypeId,
          event.arrival,
          event.departure,
          event.rooms,
        ),
      );
    } else {
      this.sagaClient.emit(
        EVENT_FAILED_AVAILABILITY_CHECK,
        new FailedAvailabliltyCheckEvent(
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
}

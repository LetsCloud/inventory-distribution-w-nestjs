import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CheckAvailabilityCommand } from '../check-availability.command';
import { Inject } from '@nestjs/common';
import { EVENT_CHECK_AVAILABILITY, SRV_INVENTORY } from '../../saga.constants';
import { ClientProxy } from '@nestjs/microservices';
import { CheckAvailabilityEvent } from '../../events/check-availability.event';

@CommandHandler(CheckAvailabilityCommand)
export class CheckAvailabilityCommandHandler
  implements ICommandHandler<CheckAvailabilityCommand>
{
  constructor(
    @Inject(SRV_INVENTORY)
    private readonly inventoryClient: ClientProxy,
  ) {}

  async execute(command: CheckAvailabilityCommand) {
    console.log('CheckAvailabilityCommandHandler->execute', command);
    this.inventoryClient.emit(
      EVENT_CHECK_AVAILABILITY,
      new CheckAvailabilityEvent(
        command.transactionId,
        command.status,
        command.propertyId,
        command.roomTypeId,
        command.arrival,
        command.departure,
        command.rooms,
      ),
    );
  }
}

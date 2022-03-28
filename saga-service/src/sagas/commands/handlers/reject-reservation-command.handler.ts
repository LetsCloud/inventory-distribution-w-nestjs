import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { RejectReservationEvent } from 'src/sagas/events/reject-reservation.event';
import {
  EVENT_REJECT_RESERVATION,
  SRV_RESERVATION,
} from 'src/sagas/saga.constants';
import { RejectReservationCommand } from '../reject-reservation.command';

@CommandHandler(RejectReservationCommand)
export class RejectReservationCommandHandler
  implements ICommandHandler<RejectReservationCommand>
{
  constructor(
    @Inject(SRV_RESERVATION)
    private readonly inventoryClient: ClientProxy,
  ) {}

  async execute(command: RejectReservationCommand) {
    console.log('RejectReservationCommandHandler->execute', command);
    this.inventoryClient.emit(
      EVENT_REJECT_RESERVATION,
      new RejectReservationEvent(
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

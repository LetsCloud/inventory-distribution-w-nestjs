import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { ApproveReservationEvent } from 'src/sagas/events/approve-reservation.event';
import {
  EVENT_APPROVE_RESERVATION,
  SRV_RESERVATION,
} from 'src/sagas/saga.constants';
import { ApproveReservationCommand } from '../approve-reservation.command';

@CommandHandler(ApproveReservationCommand)
export class ApproveResrevationCommandHandler
  implements ICommandHandler<ApproveReservationCommand>
{
  constructor(
    @Inject(SRV_RESERVATION)
    private readonly reservationClient: ClientProxy,
  ) {}

  async execute(command: ApproveReservationCommand) {
    this.reservationClient.emit(
      EVENT_APPROVE_RESERVATION,
      new ApproveReservationEvent(
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

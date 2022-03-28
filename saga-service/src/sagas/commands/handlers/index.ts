import { CheckAvailabilityCommandHandler } from './check-availability-command.handler';
import { ApproveResrevationCommandHandler } from './approve-reservation-command.handler';
import { RejectReservationCommandHandler } from './reject-reservation-command.handler';

export const CommandHandlers = [
  CheckAvailabilityCommandHandler,
  ApproveResrevationCommandHandler,
  RejectReservationCommandHandler,
];

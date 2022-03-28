import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckAvailabilityCommand } from './commands/check-availability.command';
import { FailedAvailabilityCheckEvent } from './events/failed-availability-check.event';
import { ReservationCreatedEvent } from './events/reservation-created.event';
import { RejectReservationCommand } from './commands/reject-reservation.command';
import { SuccessfulAvailabilityCheckEvent } from './events/successful-availability-check.event';
import { ApproveReservationCommand } from './commands/approve-reservation.command';

@Injectable()
export class CreateReservationSaga {
  // *****************************
  // ReservationCreated
  // *****************************
  @Saga()
  reservationCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReservationCreatedEvent),
      map((event) => {
        console.log('CreateReservationSaga->reservationCreated', event);
        return new CheckAvailabilityCommand(
          event.transactionId,
          event.status,
          event.propertyId,
          event.roomTypeId,
          event.arrival,
          event.departure,
          event.rooms,
        );
      }),
    );
  };
  // *****************************
  // Successful Availability Check
  // *****************************
  @Saga()
  successfulAvailabilityCheck = (
    events$: Observable<any>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SuccessfulAvailabilityCheckEvent),
      map((event) => {
        console.log(
          'CreateReservationSaga->successfulAvailabilityCheck',
          event,
        );
        return new ApproveReservationCommand(
          event.transactionId,
          event.status,
          event.propertyId,
          event.roomTypeId,
          event.arrival,
          event.departure,
          event.rooms,
        );
      }),
    );
  };
  // *****************************
  // Failed Availability Check
  // *****************************
  @Saga()
  failedAvailabilityCheck = (
    events$: Observable<any>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(FailedAvailabilityCheckEvent),
      map((event) => {
        console.log('CreateReservationSaga->failedAvailabilityCheck', event);
        return new RejectReservationCommand(
          event.transactionId,
          event.status,
          event.propertyId,
          event.roomTypeId,
          event.arrival,
          event.departure,
          event.rooms,
        );
      }),
    );
  };
}

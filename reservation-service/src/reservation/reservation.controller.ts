import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { ReservationDto } from './dto/reservation.dto';
import {
  EVENT_APPROVE_RESERVATION,
  EVENT_REJECT_RESERVATION,
  EVENT_RESERVATION_CREATED,
  SRV_SAGA,
} from './reservation.constants';
import * as uuid from 'uuid';
import { ReservationService } from './reservation.service';
import { ReservationCreatedEvent } from './events/reservation-created.event';
import { ApproveReservationEvent } from './events/approve-reservation.event';
import { RejectReservationEvent } from './events/reject-reservation.event';

@Controller('reservation')
export class ReservationController {
  constructor(
    private service: ReservationService,
    @Inject(SRV_SAGA)
    private readonly sagaClient: ClientProxy,
  ) {}

  @Get(':transactionId')
  async getReservation(@Param('transactionId') transactionId: string) {
    console.log('getReservation', transactionId);
    return this.service.getReservationById(transactionId);
  }

  @Get('id/:id')
  async getReservationById2(@Param('id') id: string) {
    console.log('ReservationController->getReservationById2->id=', id);
    return this.service.getReservationById2(id);
  }

  @Get()
  async getReservations() {
    return this.service.getReservations();
  }

  @Post()
  createReservation(@Body() dto: ReservationDto) {
    console.log('createReservation', dto);
    const transactionId = uuid.v4();
    const status = 'PENDING';

    this.service
      .createReservation({ ...dto, transactionId, status })
      .then((r) => {
        this.sagaClient.emit(
          EVENT_RESERVATION_CREATED,
          new ReservationCreatedEvent(
            r.transactionId,
            r.status,
            r.propertyId,
            r.roomTypeId,
            r.arrival,
            r.departure,
            r.rooms,
          ),
        );
      });
    return { transactionId, status };
  }

  @EventPattern(EVENT_APPROVE_RESERVATION)
  handlesApproveReservationEvent(event: ApproveReservationEvent) {
    console.log('handlesApproveReservationEvent', event);
  }

  @EventPattern(EVENT_REJECT_RESERVATION)
  handleRejectReservationEvent(event: RejectReservationEvent) {
    console.log('handleRejectReservationEvent', event);
    this.service.updateReservation({ ...event, status: 'REJECTED' });
  }
}

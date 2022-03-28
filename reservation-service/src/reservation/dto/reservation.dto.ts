export class ReservationDto {
  readonly propertyId: string;
  readonly roomTypeId: string;
  readonly arrival: Date;
  readonly departure: Date;
  readonly rooms: number;
  readonly status: string;
  readonly transactionId: string;
}

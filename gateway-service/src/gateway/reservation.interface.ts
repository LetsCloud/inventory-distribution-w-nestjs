export interface Reservation {
  readonly _id: string;
  readonly propertyId: string;
  readonly roomTypeId: string;
  readonly departure: Date;
  readonly arrival: Date;
  readonly rooms: number;
  readonly status: string;
}

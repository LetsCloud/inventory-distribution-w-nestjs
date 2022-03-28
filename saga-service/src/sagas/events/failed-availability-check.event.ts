export class FailedAvailabilityCheckEvent {
  constructor(
    public readonly transactionId: string,
    public readonly status: string,
    public readonly propertyId: string,
    public readonly roomTypeId: string,
    public readonly arrival: Date,
    public readonly departure: Date,
    public readonly rooms: number,
  ) {}
}

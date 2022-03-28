export class InventoryChangeDto {
  constructor(
    public readonly propertyId: string,
    public readonly roomTypeId: string,
    public readonly rooms: number,
    public readonly inventoryDate: Date,
    public readonly transactionTime: Date,
    public readonly transactionType: string,
    public readonly reference: string,
  ) {}
}

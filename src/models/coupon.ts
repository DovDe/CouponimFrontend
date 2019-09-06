export class Coupon {
  constructor(
    public id?: number,
    public company?: number,
    public categoryName?: string,
    public title?: string,
    public description?: string,
    public startDate?: Date,
    public endDate?: Date,
    public amount?: number,
    public price?: number,
    public image?: string
  ) {}
}

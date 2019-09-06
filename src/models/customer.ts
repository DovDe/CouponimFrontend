import { Coupon } from "./coupon";

export class Customer {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public password?: string
  ) {}
}

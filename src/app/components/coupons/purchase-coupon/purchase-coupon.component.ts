import { Component, OnInit, Input } from "@angular/core";
import { Coupon } from "src/models/coupon";

@Component({
  selector: "app-purchase-coupon",
  templateUrl: "./purchase-coupon.component.html",
  styleUrls: ["./purchase-coupon.component.scss"]
})
export class PurchaseCouponComponent implements OnInit {
  @Input() coupon: Coupon;
  constructor() {}

  ngOnInit() {}
}

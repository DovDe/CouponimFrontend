import { Component, OnInit } from "@angular/core";
import { ListElement } from "src/models/listElement";
import { Coupon } from "src/models/coupon";
import { DataStoreService } from "src/app/services/data-store.service";
import lists from "../../../utils/lists";

@Component({
  selector: "app-customer-dashboard",
  templateUrl: "./customer-dashboard.component.html",
  styleUrls: ["./customer-dashboard.component.scss"]
})
export class CustomerDashboardComponent implements OnInit {
  public availableCoupons: Coupon[] = [];
  public purchasedCoupons: Coupon[] = [];

  public showingOne: boolean = false;
  public usertype: string;
  public currentCouponFilterType: string;

  public coupSections: ListElement[] = [...lists.customerDashCouponSections];

  constructor(private dataStore: DataStoreService) {}

  ngOnInit() {
    this.dataStore.purchasedCoupons.subscribe(
      pCoups => (this.purchasedCoupons = pCoups)
    );
    this.dataStore.availableCoupons.subscribe(
      avCoups => (this.availableCoupons = avCoups)
    );
    this.dataStore.setCustomerCoupons();
  }

  openOne(event, itemType) {
    this.dataStore[itemType].next(event);
    this.ngOnInit();
  }
}

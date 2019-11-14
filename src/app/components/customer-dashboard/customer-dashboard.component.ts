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

  // load table sections from utils/lists
  public coupSections: ListElement[] = lists.customerDashCouponSections;

  constructor(private dataStore: DataStoreService) {}

  ngOnInit() {
    //load purchased coupons from data store and set to local variable
    this.dataStore.purchasedCoupons.subscribe(
      pCoups => (this.purchasedCoupons = pCoups)
    );
    // load available coupons from data store and set to local variable
    this.dataStore.availableCoupons.subscribe(
      avCoups => (this.availableCoupons = avCoups)
    );

    // calls method that gets coupons from db and sets them in the data store
    this.dataStore.setCustomerCoupons();
  }

  // method to open modal and set data in data store
  openOne(event, itemType) {
    this.dataStore[itemType].next(event);
    this.ngOnInit();
  }
}

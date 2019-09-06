import { Component, OnInit, Input } from "@angular/core";
import { ListElement } from "src/models/listElement";
import { FilterService } from "src/app/services/filter.service";
import { GeneralService } from "src/app/services/general.service";
import { Coupon } from "src/models/coupon";

@Component({
  selector: "app-customer-dashboard",
  templateUrl: "./customer-dashboard.component.html",
  styleUrls: ["./customer-dashboard.component.scss"]
})
export class CustomerDashboardComponent implements OnInit {
  public coupons: Coupon[];
  public showingOne: boolean = false;
  public usertype: string;
  public purchasedCoupons: Coupon[];

  public coupSections: ListElement[] = [
    new ListElement("title", "Title", null, true, "text"),
    new ListElement("categoryName", "Category", null, true, "select"),
    new ListElement("startDate", "Start Date", null, true, "date"),
    new ListElement("endDate", "End Date", null, true, "date"),
    new ListElement("price", "Price", null, true, "number")
  ];
  constructor(
    private filterService: FilterService,
    private genService: GeneralService
  ) {}

  ngOnInit() {
    this.genService.getItemArray("coupon", "customer").subscribe(coups => {
      this.coupons = coups;
    });
    this.genService.getPurchasedCoupon().subscribe(coupons => {
      this.setUpPurchased(coupons);
    });

    this.filterService.filter.subscribe(coupons => {
      if (coupons) this.coupons = coupons;
    });

    this.usertype = sessionStorage.usertype;
  }

  openOne(event, itemType) {
    if (itemType == "coupon") {
      this.genService.coupon = event;
      this.genService.couponsEmiter.emit(event);
    } else {
      this.genService.companies = event;
      this.genService.companiesEmiter.emit(event);
    }

    this.ngOnInit();
  }

  setUpPurchased(coupons) {
    this.purchasedCoupons = coupons;

    this.coupons = this.coupons.filter(coup => {
      let toReturn = true;
      coupons.forEach(pCoup => {
        if (pCoup.id == coup.id) toReturn = false;
      });

      if (toReturn) return coup;
    });
  }
}

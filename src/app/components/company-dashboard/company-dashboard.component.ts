import { Component, OnInit } from "@angular/core";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { Coupon } from "src/models/coupon";
import { DataStoreService } from "src/app/services/data-store.service";
import lists from "../../../utils/lists";
import { MessageService } from "src/app/services/message.service";
@Component({
  selector: "app-company-dashboard",
  templateUrl: "./company-dashboard.component.html",
  styleUrls: ["./company-dashboard.component.scss"]
})
export class CompanyDashboardComponent implements OnInit {
  public coupons: Coupon[];
  public showingOne: boolean = false;

  // load coupon section from utils/lists
  public initialSections: ListElement[] = lists.companyDashCoupons;

  constructor(
    private generalService: GeneralService,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // get companies from DB
    this.generalService.getItemArray("coupon").subscribe(
      companyCoups => {
        //store companies and filtered companies in dataStore service
        this.dataStore.allCoupons.next(companyCoups);
        this.dataStore.companyCouponsFiltered.next(companyCoups);
      },
      err => this.messageService.message.next(err)
    );

    // load filtered coupons from dataStore and set local variable
    this.dataStore.companyCouponsFiltered.subscribe(
      cCoups => (this.coupons = cCoups),
      err => this.messageService.message.next(err)
    );
  }

  // method to open modal with selected coupon
  openOne(coup) {
    this.dataStore.coupon.next(coup);
    this.ngOnInit();
  }
}

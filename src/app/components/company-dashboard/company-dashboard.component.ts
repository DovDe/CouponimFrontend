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

  public initialSections: ListElement[] = lists.companyDashCoupons;

  constructor(
    private generalService: GeneralService,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.generalService.getItemArray("coupon").subscribe(
      companyCoups => {
        this.dataStore.companies.next(companyCoups);
        this.dataStore.companyCouponsFiltered.next(companyCoups);
      },
      err => this.messageService.message.next(err)
    );

    this.dataStore.companyCouponsFiltered.subscribe(
      cCoups => (this.coupons = cCoups),
      err => this.messageService.message.next(err)
    );
  }

  openOne(coup) {
    this.dataStore.coupon.next(coup);
    this.ngOnInit();
  }
}

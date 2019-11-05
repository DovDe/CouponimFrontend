import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { ListElement } from "src/models/listElement";
import { FilterService } from "src/app/services/filter.service";
import { GeneralService } from "src/app/services/general.service";
import { Coupon } from "src/models/coupon";
import { Customer } from "src/models/customer";
import { Company } from "src/models/company";
import { DataStoreService } from "src/app/services/data-store.service";
@Component({
  selector: "app-company-dashboard",
  templateUrl: "./company-dashboard.component.html",
  styleUrls: ["./company-dashboard.component.scss"]
})
export class CompanyDashboardComponent implements OnInit {
  public coupons: Coupon[];
  public customers: Customer[];
  public showingOne: boolean = false;

  @Input()
  public currentCompany: Company;

  public initialSections: ListElement[] = [
    new ListElement("title", "Title", "text"),
    new ListElement("categoryName", "Category", "select"),
    new ListElement("startDate", "Start Date", "date"),
    new ListElement("endDate", "End Date", "date"),
    new ListElement("amount", "Amount", "number"),
    new ListElement("price", "Price", "number")
  ];

  constructor(
    private generalService: GeneralService,
    private dataStore: DataStoreService
  ) {}

  ngOnInit() {
    this.generalService.getItemArray("coupon").subscribe(companyCoups => {
      this.dataStore.companies.next(companyCoups);
      this.dataStore.companyCouponsFiltered.next(companyCoups);
    });

    this.dataStore.companyCouponsFiltered.subscribe(
      cCoups => (this.coupons = cCoups)
    );
  }

  openOne(coup) {
    this.generalService.coupon = coup;
    this.ngOnInit();
  }
}

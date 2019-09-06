import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { ListElement } from "src/models/listElement";
import { FilterService } from "src/app/services/filter.service";
import { GeneralService } from "src/app/services/general.service";
import { Coupon } from "src/models/coupon";
import { Customer } from "src/models/customer";
import { Company } from "src/models/company";
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
    new ListElement("title", "Title", null, true, "text"),
    new ListElement("categoryName", "Category", null, true, "select"),
    new ListElement(
      "startDate",
      "Start Date",
      'date: "dd/MM/yyyy"',
      true,
      "date"
    ),
    new ListElement("endDate", "End Date", 'date: "dd/MM/yyyy"', true, "date"),
    new ListElement("amount", "Amount", null, true, "number"),
    new ListElement("price", "Price", null, true, "number")
  ];

  constructor(
    private filterService: FilterService,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.generalService
      .getItemArray("coupon", "company")
      .subscribe(companyCoups => (this.coupons = companyCoups));

    this.filterService.filter.subscribe(coupons => {
      if (coupons) this.coupons = coupons;
    });
  }

  // getCustomers() {
  //   let customers = new Set();
  //   this.coupons.forEach(c => {
  //     c.customer.forEach(cust => {
  //       customers.add(cust);
  //     });
  //   });
  //   this.customers = Array.from(customers);
  // }

  openOne(coup) {
    this.generalService.coupon = coup;
    this.ngOnInit();
  }
}

import { Component, OnInit } from "@angular/core";
import { Coupon } from "src/models/coupon";
import { Customer } from "src/models/customer";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { Company } from "src/models/company";
import { DataStoreService } from "src/app/services/data-store.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"]
})
export class AdminDashboardComponent implements OnInit {
  public coupons: Coupon[];
  public customers: Customer[];
  public companies: Company[];

  public showingOne: boolean = false;
  public compSections: ListElement[];
  public custSections: ListElement[];

  constructor(
    private genService: GeneralService,
    private dataStore: DataStoreService
  ) {
    this.compSections = this.dataStore.compSections;
    this.custSections = this.dataStore.custSections;
  }

  ngOnInit() {
    this.genService.getItemArray("customer").subscribe(
      customers => this.dataStore.customers.next(customers),

      err => console.log(err)
    );

    this.genService
      .getItemArray("company")
      .subscribe(items => (this.companies = items), err => console.log(err));
  }

  openOne(event, itemType) {
    if (itemType == "customer") {
      this.genService.customer = event;
    } else {
      this.genService.company = event;
    }

    this.ngOnInit();
  }
}

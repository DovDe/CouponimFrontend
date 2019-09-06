import { Component, OnInit } from "@angular/core";
import { Coupon } from "src/models/coupon";
import { Customer } from "src/models/customer";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { Company } from "src/models/company";

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

  public custSections: ListElement[] = [
    new ListElement("firstName", "First Name", null, true, "text"),
    new ListElement("lastName", "Last Name", null, true, "text"),
    new ListElement("email", "Email", null, true, "email")
  ];
  public compSections: ListElement[] = [
    new ListElement("name", "Name", null, true, "text"),
    new ListElement("email", "Email", null, true, "email"),
    new ListElement()
  ];
  constructor(private genService: GeneralService) {}

  ngOnInit() {
    this.genService
      .getItemArray("customer", "administrator")
      .subscribe(res => (this.customers = res), err => console.log(err));

    this.genService
      .getItemArray("company", "administrator")
      .subscribe(items => (this.companies = items), err => console.log(err));
  }

  openOne(event, itemType) {
    if (itemType == "customer") {
      this.genService.customer = event;
      // this.genService.customersEmiter.emit(event);
    } else {
      this.genService.company = event;
      // this.genService.companiesEmiter.emit(event);
    }

    this.ngOnInit();
  }
}

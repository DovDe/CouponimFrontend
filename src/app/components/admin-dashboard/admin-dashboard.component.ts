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
    new ListElement("firstName", "First Name", "text"),
    new ListElement("lastName", "Last Name", "text"),
    new ListElement("email", "Email", "email")
  ];
  public compSections: ListElement[] = [
    new ListElement("name", "Name", "text"),
    new ListElement("email", "Email", "email"),
    new ListElement()
  ];
  constructor(private genService: GeneralService) {}

  ngOnInit() {
    this.genService
      .getItemArray("customer")
      .subscribe(res => (this.customers = res), err => console.log(err));

    this.genService
      .getItemArray("company")
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

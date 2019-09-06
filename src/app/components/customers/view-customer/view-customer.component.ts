import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
import { Customer } from "src/models/customer";

@Component({
  selector: "app-view-customer",
  templateUrl: "./view-customer.component.html",
  styleUrls: ["./view-customer.component.scss"]
})
export class ViewCustomerComponent implements OnInit {
  public customer: Customer;
  public sections: ListElement[] = [
    new ListElement("firstName", "First Name", null, true, "text"),
    new ListElement("lastName", "Last Name", null, true, "text"),
    new ListElement("email", "Email", null, true, "email")
  ];
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private genService: GeneralService, private router: Router) {}

  ngOnInit() {
    this.customer = this.genService.customer;
  }

  onDelete() {
    this.genService.deleteItem(this.customer, "customer").subscribe(
      () => {
        this.close.emit();
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
      }
    );
  }
}

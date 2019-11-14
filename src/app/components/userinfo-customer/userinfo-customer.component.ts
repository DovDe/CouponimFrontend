import { Component, OnInit } from "@angular/core";
import { Customer } from "src/models/customer";
import { DataStoreService } from "src/app/services/data-store.service";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-userinfo-customer",
  templateUrl: "./userinfo-customer.component.html",
  styleUrls: ["./userinfo-customer.component.scss"]
})
export class UserinfoCustomerComponent implements OnInit {
  public customer: Customer;

  constructor(
    private dataStore: DataStoreService,
    private genService: GeneralService
  ) {}
  ngOnInit() {
    this.dataStore.userInfo.subscribe(user => {
      // check if user exists in datastore and set if exists
      if (!!user) this.customer = user;
      //  if not load user info from data store and set local variable
      else
        this.genService
          .getUserInfo()
          .subscribe(userInfo => (this.customer = userInfo));
    });
  }
}

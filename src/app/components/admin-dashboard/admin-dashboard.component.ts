import { Component, OnInit } from "@angular/core";
import { Customer } from "src/models/customer";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { Company } from "src/models/company";
import { DataStoreService } from "src/app/services/data-store.service";
import lists from "../../../utils/lists";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"]
})
export class AdminDashboardComponent implements OnInit {
  public customers: Customer[];
  public companies: Company[];

  public showingOne: boolean = false;

  // load table lists from utils/lists
  public compSections: ListElement[] = lists.adminDashCompanySections;
  public custSections: ListElement[] = lists.adminDashCustomerSections;

  constructor(
    private genService: GeneralService,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // load customers and store customers in dataStore service
    this.genService.getItemArray("customer").subscribe(
      customers => this.dataStore.customers.next(customers),
      err => this.messageService.message.next(err)
    );

    // load companies and store companies in dataStore service
    this.genService.getItemArray("company").subscribe(
      companies => this.dataStore.companies.next(companies),
      err => this.messageService.message.next(err)
    );
  }

  // store proper data in dataStore and open modal method
  openOne(event, itemType) {
    this.dataStore[itemType].next(event);
    this.ngOnInit();
  }
}

import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Customer } from "src/models/customer";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
import { DataStoreService } from "src/app/services/data-store.service";
import lists from "../../../utils/lists";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"]
})
export class CustomersComponent implements OnInit {
  public customers: Customer[];

  public sections: ListElement[] = lists.adminDashCustomerSections;
  public isLoading: boolean = false;
  @Output() openOne = new EventEmitter<Customer>();

  public viewType: string;
  public viewOne: boolean = false;

  constructor(
    private genService: GeneralService,
    private router: Router,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getCustomers();
  }

  clickedRowButton(cust: Customer, event) {
    this.openOne.emit(cust);
    this.viewType = event.target.value;
    this.viewOne = true;
  }

  onClose() {
    this.getCustomers();
    this.viewType = null;
    this.viewOne = false;
  }
  openAddCustomer() {
    this.viewType = "add";
    this.viewOne = true;
  }
  getCustomers() {
    this.isLoading = true;
    this.dataStore.customers.subscribe(customers => {
      this.customers = customers;
      this.isLoading = false;
    });
  }

  onDelete(customer: Customer) {
    let name = customer.firstName;
    this.genService.deleteItem(customer, "customer").subscribe(
      () => {
        let customers = this.customers.filter(cust => {
          return cust != customer;
        });
        this.messageService.message.next(`${name} was deleted`);
        this.dataStore.customers.next(customers);
        this.onClose();
      },
      err => this.messageService.message.next(err)
    );
  }
}

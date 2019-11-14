import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Customer } from "src/models/customer";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
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

  // load customer table columns from utils/lists
  public sections: ListElement[] = lists.adminDashCustomerSections;

  // public isLoading: boolean = false;
  @Output() openOne = new EventEmitter<Customer>();

  public viewType: string;
  public viewOne: boolean = false;

  constructor(
    private genService: GeneralService,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    //load customers from dataStore and set to local variable
    this.dataStore.customers.subscribe(
      customers => (this.customers = customers)
    );
  }

  // method to open modal and set the customer
  clickedRowButton(cust: Customer, event) {
    this.openOne.emit(cust);
    this.viewType = event.target.value;
    this.viewOne = true;
  }

  // method called to close modal
  onClose() {
    this.viewType = null;
    this.viewOne = false;
  }

  // method to open the form to add a customer
  openAddCustomer() {
    this.viewType = "add";
    this.viewOne = true;
  }

  // delete a customer
  onDelete(customer: Customer) {
    // set name for user notifiation
    let name = customer.firstName;
    // delete from db
    this.genService.deleteItem(customer, "customer").subscribe(
      () => {
        // set new array to customers without the delete customer
        let customers = this.customers.filter(cust => {
          return cust != customer;
        });
        // notfiy user that deletion was successful
        this.messageService.message.next(`${name} was deleted`);
        // update customers in datastore
        this.dataStore.customers.next(customers);
        // close modal
        this.onClose();
      },
      err => this.messageService.message.next(err)
    );
  }
}

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { Customer } from "src/models/customer";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"]
})
export class CustomersComponent implements OnInit {
  @Input() public customers: Customer[];
  public currentCustomers: Customer[];

  @Input() public sections: ListElement[] = [
    new ListElement("firstName", "First Name", null, true, "text"),
    new ListElement("lastName", "Last Name", null, true, "text"),
    new ListElement("email", "Email", null, true, "email")
  ];
  public isLoading: boolean = false;
  @Output() openOne = new EventEmitter<Customer>();
  @Input() usertype;

  public viewType: string;
  public viewOne: boolean = false;

  constructor(private genService: GeneralService, private router: Router) {}

  ngOnInit() {
    if (this.customers == undefined && !this.viewOne) {
      this.getCustomers();
    }
  }

  clickedRowButton(cust: Customer, event) {
    this.openOne.emit(cust);
    this.viewType = event.target.value;
    this.viewOne = true;
  }

  onClose() {
    this.viewType = null;
    this.viewOne = false;
  }
  openAddCustomer() {
    this.viewType = "add";
    this.viewOne = true;
  }
  getCustomers() {
    this.isLoading = true;
    this.genService
      .getItemArray("customer", this.usertype)
      .subscribe(custArr => {
        this.isLoading = false;
        this.currentCustomers = custArr;
      });
  }

  onDelete(customer: Customer) {
    this.genService.deleteItem(customer, "customer").subscribe(
      () => {
        this.onClose();
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
      }
    );
  }
}

import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
import { ListElement } from "src/models/listElement";
import lists from "../../../../utils/lists";
import { MustMatch } from "src/utils/formValidators";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-add-customer",
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.scss"]
})
export class AddCustomerComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  // load form sections from utils/lists
  public sections: ListElement[] = lists.adminDashUpdateCustomer;
  constructor(
    private genService: GeneralService,
    private router: Router,
    private messageService: MessageService
  ) {}

  public addCustomerForm: FormGroup;

  ngOnInit() {
    //setup form with validation
    this.addCustomerForm = new FormGroup(
      {
        firstName: new FormControl(null, [
          Validators.required,
          Validators.minLength(1)
        ]),
        lastName: new FormControl(null, [
          Validators.required,
          Validators.minLength(1)
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(4)
        ]),
        confirmPassword: new FormControl(null, [Validators.required])
      },
      // password confirmation
      MustMatch("password", "confirmPassword").bind(this)
    );
  }

  // method to check if form is valid from html
  isValid(i) {
    let val = this.addCustomerForm.get(`${this.sections[i].dbName}`);
    return val.touched && val.invalid;
  }
  // method to get form control from html
  getSection(i) {
    return this.addCustomerForm.get(`${this.sections[i].dbName}`);
  }

  // add customer to db
  addCustomer() {
    // notify if form is invalid
    if (this.addCustomerForm.invalid)
      this.messageService.message.next("The form is invalid please fix errors");
    else {
      // add customer to db
      this.genService.addItem(this.addCustomerForm.value, "customer").subscribe(
        () => {
          // notify user
          this.messageService.message.next(
            `${
              this.addCustomerForm.get("firstName").value
            } was added to customers`
          );
          // close modal
          this.close.emit();
          // navigate back to reload customers
          this.router.navigate(["/home"]);
        },
        err => this.messageService.message.next(err)
      );
    }
  }
}

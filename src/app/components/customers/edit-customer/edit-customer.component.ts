import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { Customer } from "src/models/customer";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import lists from "../../../../utils/lists";
import { ListElement } from "src/models/listElement";
import { MustMatch } from "src/utils/formValidators";
import { DataStoreService } from "src/app/services/data-store.service";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-edit-customer",
  templateUrl: "./edit-customer.component.html",
  styleUrls: ["./edit-customer.component.scss"]
})
export class EditCustomerComponent implements OnInit {
  public customer: Customer;

  public updateCustomerForm: FormGroup;
  public sections: ListElement[] = lists.adminDashUpdateCustomer;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private genService: GeneralService,
    private dataStore: DataStoreService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.dataStore.customer.subscribe(customer => (this.customer = customer));
    this.updateCustomerForm = new FormGroup(
      {
        firstName: new FormControl(this.customer.firstName, [
          Validators.required,
          Validators.minLength(1)
        ]),
        lastName: new FormControl(this.customer.lastName, [
          Validators.required,
          Validators.minLength(1)
        ]),
        email: new FormControl(this.customer.email, [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl(this.customer.password, [
          Validators.required,
          Validators.minLength(4)
        ]),
        confirmPassword: new FormControl(null, [Validators.required])
      },
      MustMatch("password", "confirmPassword").bind(this)
    );
  }

  updateCustomer() {
    let confirmPassword = this.updateCustomerForm.controls.confirmPassword
      .invalid;
    if (this.updateCustomerForm.invalid && !confirmPassword) {
      this.messageService.message.next(
        "Sorry: this form is invalid please check the form and submit it again"
      );
      return;
    }
    this.setFormValuesForDb();

    if (confirmPassword) {
      this.update(
        `${this.customer.firstName} was update with no change to password`
      );
    } else {
      this.update(`${this.customer.firstName} was updated`);
    }
  }

  isValid(i) {
    let val = this.updateCustomerForm.get(`${this.sections[i].dbName}`);
    return val.touched && val.invalid;
  }
  getSection(i) {
    return this.updateCustomerForm.get(`${this.sections[i].dbName}`);
  }

  setFormValuesForDb() {
    this.sections.forEach(section => {
      if (this.customer.hasOwnProperty(section.dbName)) {
        this.customer[section.dbName] = this.updateCustomerForm.get(
          section.dbName
        ).value;
      }
    });
  }
  update(updateMessage: string) {
    this.genService.updateItem(this.customer, "customer").subscribe(
      () => {
        this.messageService.message.next(updateMessage);
        this.close.emit();
        this.router.navigate([`/home`]);
      },
      err => this.messageService.message.next(err)
    );
  }
}

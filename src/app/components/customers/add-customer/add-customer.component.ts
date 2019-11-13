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

  public sections: ListElement[] = lists.adminDashUpdateCustomer;
  constructor(
    private genService: GeneralService,
    private router: Router,
    private messageService: MessageService
  ) {}

  public addCustomerForm: FormGroup;

  ngOnInit() {
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
      MustMatch("password", "confirmPassword").bind(this)
    );
  }

  isValid(i) {
    let val = this.addCustomerForm.get(`${this.sections[i].dbName}`);
    return val.touched && val.invalid;
  }
  getSection(i) {
    return this.addCustomerForm.get(`${this.sections[i].dbName}`);
  }

  addCustomer() {
    if (this.addCustomerForm.invalid) {
      this.messageService.message.next("The form is invalid please fix errors");
    } else {
      this.genService.addItem(this.addCustomerForm.value, "customer").subscribe(
        () => {
          this.messageService.message.next(
            `${
              this.addCustomerForm.get("firstName").value
            } was added to customers`
          );
          this.close.emit();
          this.router.navigate(["/home"]);
        },
        err => this.messageService.message.next(err)
      );
    }
  }
}

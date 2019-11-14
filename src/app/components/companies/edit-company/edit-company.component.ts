import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { Company } from "src/models/company";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
import { DataStoreService } from "src/app/services/data-store.service";
import { MustMatch } from "../../../../utils/formValidators";
import { MessageService } from "src/app/services/message.service";
import lists from "../../../../utils/lists";
import { ListElement } from "src/models/listElement";

@Component({
  selector: "app-edit-company",
  templateUrl: "./edit-company.component.html",
  styleUrls: ["./edit-company.component.scss"]
})
export class EditCompanyComponent implements OnInit {
  public company: Company;
  // load form sections from utils/lists
  public sections: ListElement[] = lists.editCompanySections;
  public updateCompanyForm: FormGroup;

  //method to close modal emitted to companies component
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private genService: GeneralService,
    private router: Router,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    //load company from db and store in local variable
    this.dataStore.company.subscribe(
      company => (this.company = company),
      err => this.messageService.message.next(err)
    );

    // setup form with validation
    this.updateCompanyForm = new FormGroup(
      {
        email: new FormControl(this.company.email, [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl(this.company.password, [
          Validators.required,
          Validators.minLength(4)
        ]),
        confirmPassword: new FormControl(null, [Validators.required])
      },
      // valdition to confirm password loaded from utils/formValidators
      MustMatch("password", "confirmPassword").bind(this)
    );
  }

  updateCompany() {
    // variable checking if password was comfirmed
    let confirmPassword: boolean = this.updateCompanyForm.controls
      .confirmPassword.invalid;

    // check if form is invalid not because of the confirmed password
    if (
      this.updateCompanyForm.invalid &&
      !confirmPassword &&
      this.updateCompanyForm.touched
    ) {
      this.messageService.message.next(
        "This form is invalid please check and resubmit"
      );
      return;
    }
    // set new compant values
    this.company.email = this.updateCompanyForm.get("email").value;
    this.company.password = this.updateCompanyForm.get("password").value;
    // if password is not confirmed update only email else update all company
    if (confirmPassword)
      this.update(`${this.company.name} was update with no change to password`);
    else this.update(`${this.company.name} was updated`);
  }

  // method to get validity of form in html
  isValid(i) {
    let val = this.updateCompanyForm.get(`${this.sections[i].dbName}`);
    return val.touched && val.invalid;
  }
  // method to get form section in html
  getSection(i) {
    return this.updateCompanyForm.get(`${this.sections[i].dbName}`);
  }

  // update company
  update(updateMessage: string) {
    this.genService.updateItem(this.company, "company").subscribe(
      () => {
        this.messageService.message.next(updateMessage);
        this.close.emit();
        this.router.navigate([`/home`]);
      },
      err => this.messageService.message.next(err)
    );
  }
}

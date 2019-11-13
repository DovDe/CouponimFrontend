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
  public sections: ListElement[] = lists.editCompanySections;
  public updateCompanyForm: FormGroup;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private genService: GeneralService,
    private router: Router,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.dataStore.company.subscribe(
      company => (this.company = company),
      err => console.log(err)
    );
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
      MustMatch("password", "confirmPassword").bind(this)
    );
  }

  updateCompany() {
    if (this.updateCompanyForm.invalid) {
      if (this.updateCompanyForm.controls.confirmPassword.invalid) {
        this.messageService.message.next("confirmed password invalid");
      } else {
        this.messageService.message.next("form is invalid");
      }
      this.close.emit();
      // this.router.navigate;
    } else {
      this.company.email = this.updateCompanyForm.get("email").value;
      this.company.password = this.updateCompanyForm.get("password").value;

      this.genService.updateItem(this.company, "company").subscribe(
        () => {
          this.close.emit();
          this.router.navigate(["/home"]);
        },
        err => this.messageService.message.next(err)
      );
    }
  }

  isValid(i) {
    let val = this.updateCompanyForm.get(`${this.sections[i].dbName}`);
    return val.touched && val.invalid;
  }
  getSection(i) {
    return this.updateCompanyForm.get(`${this.sections[i].dbName}`);
  }
}

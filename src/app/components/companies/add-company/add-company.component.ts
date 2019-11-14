import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
import lists from "../../../../utils/lists";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-add-company",
  templateUrl: "./add-company.component.html",
  styleUrls: ["./add-company.component.scss"]
})
export class AddCompanyComponent implements OnInit {
  // method to close modal emitted to companies component
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  public addCompanyForm: FormGroup;

  // load form sections
  public sections: ListElement[] = lists.addCompanySections;

  constructor(
    private genService: GeneralService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // setup form with validators
    this.addCompanyForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(1)
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  // method to get validity of form in html
  isValid(i) {
    let val = this.addCompanyForm.get(`${this.sections[i].dbName}`);
    return val.touched && val.invalid;
  }

  // method to get form section in html
  getSection(i) {
    return this.addCompanyForm.get(`${this.sections[i].dbName}`);
  }

  // post company to database
  addItem() {
    // check if form is valid
    if (this.addCompanyForm.invalid)
      // notify user that the form is invalid
      this.messageService.message.next(
        "The form is invalid -- please correct the form and resubmit"
      );
    else {
      // add to DB and notify user if successfull
      this.genService.addItem(this.addCompanyForm.value, "company").subscribe(
        () => {
          this.messageService.message.next(
            `${this.addCompanyForm.get("name").value} was added to companies`
          );
          this.close.emit();
          this.router.navigate(["/home"]);
        },
        err => this.messageService.message.next(err)
      );
    }
  }
}

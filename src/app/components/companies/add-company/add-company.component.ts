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
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  public addCompanyForm: FormGroup;
  public sections: ListElement[] = lists.addCompanySections;
  constructor(
    private genService: GeneralService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
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

  isValid(i) {
    let val = this.addCompanyForm.get(`${this.sections[i].dbName}`);
    return val.touched && val.invalid;
  }
  getSection(i) {
    return this.addCompanyForm.get(`${this.sections[i].dbName}`);
  }

  addItem() {
    if (this.addCompanyForm.invalid) {
      this.close.emit();
      this.router.navigate(["/home"]);
    } else {
      this.genService.addItem(this.addCompanyForm.value, "company").subscribe(
        () => {
          this.messageService.message.next(
            `${this.addCompanyForm.get("name").value} was added to companies`
          );
          this.close.emit();
          this.router.navigate(["/home"]);
        },
        err => {
          this.messageService.message.next(err);
          this.router.navigate(["/administrator"]);
        }
      );
    }
  }
}

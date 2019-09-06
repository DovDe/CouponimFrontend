import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-company",
  templateUrl: "./add-company.component.html",
  styleUrls: ["./add-company.component.scss"]
})
export class AddCompanyComponent implements OnInit {
  @ViewChild("f", { static: true }) addForm: NgForm;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  public sections: ListElement[] = [
    new ListElement("name", "Name", null, true, "text"),
    new ListElement("email", "Email", null, true, "email"),
    new ListElement("password", "Password", null, true, "password")
  ];
  constructor(private genService: GeneralService, private router: Router) {}

  ngOnInit() {}

  addItem() {
    this.genService.addItem(this.addForm.value, "company").subscribe(
      () => {
        this.close.emit();
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
        this.router.navigate(["/administrator"]);
      }
    );
  }
}

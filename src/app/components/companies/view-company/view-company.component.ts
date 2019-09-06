import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
import { Company } from "src/models/company";

@Component({
  selector: "app-view-company",
  templateUrl: "./view-company.component.html",
  styleUrls: ["./view-company.component.scss"]
})
export class ViewCompanyComponent implements OnInit {
  public company: Company;

  public sections: ListElement[] = [
    new ListElement("name", "Name", null, true, "text"),
    new ListElement("email", "Email", null, true, "email")
  ];
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private genService: GeneralService, private router: Router) {}

  ngOnInit() {
    this.company = this.genService.company;
  }

  // onUpdate() {
  //   this.genService.updateItem(this.newCompany, "company").subscribe(
  //     () => {
  //       this.close.emit();
  //       this.router.navigate(["/home"]);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  onDelete() {
    this.genService.deleteItem(this.company, "company").subscribe(
      () => {
        this.close.emit();
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
      }
    );
  }
}

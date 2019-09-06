import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Company } from "src/models/company";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.scss"]
})
export class CompaniesComponent implements OnInit {
  @Input() public companies: Company[];
  public currentCompanies: Company[];

  @Input() public sections: ListElement[] = [
    new ListElement("name", "Name", null, true, "text"),
    new ListElement("email", "Email", null, true, "email"),
    new ListElement()
  ];
  public isLoading = false;
  @Output() openOne = new EventEmitter<Company>();
  @Input() usertype;

  public viewType: string;
  public viewOne: boolean = false;

  constructor(private genService: GeneralService, private router: Router) {}

  ngOnInit() {
    if (this.companies == undefined && !this.viewOne) {
      this.getCompanies();
    }
  }

  getCompanies() {
    this.isLoading = true;
    this.genService
      .getItemArray("company", this.usertype)
      .subscribe(compArr => {
        this.isLoading = false;
        this.currentCompanies = compArr;
      });
  }
  clickedRowButton(comp: Company, event) {
    this.openOne.emit(comp);
    this.viewType = event.target.value;
    this.viewOne = true;
  }

  onClose() {
    this.viewType = null;
    this.viewOne = false;
  }
  openAdd() {
    this.viewType = "add";
    this.viewOne = true;
  }

  onDelete(company: Company) {
    this.genService.deleteItem(company, "company").subscribe(
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

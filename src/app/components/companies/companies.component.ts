import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Company } from "src/models/company";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
import lists from "../../../utils/lists";
import { DataStoreService } from "src/app/services/data-store.service";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.scss"]
})
export class CompaniesComponent implements OnInit {
  public companies: Company[];
  public sections: ListElement[] = lists.adminDashCompanySections;

  @Output() openOne = new EventEmitter<Company>();
  public viewType: string;
  public viewOne: boolean = false;

  constructor(
    private genService: GeneralService,
    private router: Router,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.dataStore.companies.subscribe(
      companies => (this.companies = companies),
      err => this.messageService.message.next(err)
    );
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
    let name = company.name;
    this.genService.deleteItem(company, "company").subscribe(
      () => {
        this.messageService.message.next(`${name} was removed from companies`);
        this.onClose();
        this.router.navigate(["/home"]);
      },
      err => this.messageService.message.next(err)
    );
  }
}

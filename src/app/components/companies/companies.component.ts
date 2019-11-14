import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Company } from "src/models/company";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
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

  //load table sections from utils/lists
  public sections: ListElement[] = lists.adminDashCompanySections;

  @Output() openOne = new EventEmitter<Company>();
  public viewType: string;
  public viewOne: boolean = false;

  constructor(
    private genService: GeneralService,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // load companies from dataStore service
    this.dataStore.companies.subscribe(
      companies => (this.companies = companies),
      err => this.messageService.message.next(err)
    );
  }

  // method to load modal and emit proper data to parent component
  clickedRowButton(comp: Company, event) {
    this.openOne.emit(comp);
    this.viewType = event.target.value;
    this.viewOne = true;
  }

  // called when modal is closed
  onClose() {
    this.viewType = null;
    this.viewOne = false;
  }

  // method to open add company modal
  openAdd() {
    this.viewType = "add";
    this.viewOne = true;
  }

  // method to delete company
  onDelete(company: Company) {
    // store name as variable to use in later messaging
    let name = company.name;

    // delete company from DB
    this.genService.deleteItem(company, "company").subscribe(
      () => {
        // notify user
        this.messageService.message.next(`${name} was removed from companies`);
        // setup updated companies and update dataStore
        let companies = this.companies.filter(comp => {
          return company != comp;
        });
        this.dataStore.companies.next(companies);
        // close modal component
        this.onClose();
      },
      err => this.messageService.message.next(err)
    );
  }
}

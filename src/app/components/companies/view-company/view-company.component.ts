import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ListElement } from "src/models/listElement";
import { Company } from "src/models/company";
import lists from "../../../../utils/lists";
import { DataStoreService } from "src/app/services/data-store.service";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-view-company",
  templateUrl: "./view-company.component.html",
  styleUrls: ["./view-company.component.scss"]
})
export class ViewCompanyComponent implements OnInit {
  public company: Company;
  public sections: ListElement[] = lists.viewCompanySections;
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.dataStore.company.subscribe(
      company => (this.company = company),
      err => this.messageService.message.next(err)
    );
  }
}

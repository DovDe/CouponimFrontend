import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ListElement } from "src/models/listElement";
import { Customer } from "src/models/customer";
import lists from "../../../../utils/lists";
import { DataStoreService } from "src/app/services/data-store.service";
import { MessageService } from "src/app/services/message.service";
@Component({
  selector: "app-view-customer",
  templateUrl: "./view-customer.component.html",
  styleUrls: ["./view-customer.component.scss"]
})
export class ViewCustomerComponent implements OnInit {
  public customer: Customer;

  public sections: ListElement[] = lists.adminDashCustomerSections;

  @Output() public close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.dataStore.customer.subscribe(
      customer => (this.customer = customer),
      err => this.messageService.message.next(err)
    );
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Coupon } from "src/models/coupon";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";
import { DataStoreService } from "src/app/services/data-store.service";
import { LoginService } from "src/app/services/login.service";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-coupons",
  templateUrl: "./coupons.component.html",
  styleUrls: ["./coupons.component.scss"]
})
export class CouponsComponent implements OnInit {
  public coupons: Coupon[];

  // load table columns from parent element
  @Input() public sections: ListElement[];

  // current usertype
  public usertype: string;

  // load table title from parent dashboard
  @Input() public title: string;

  public viewType: string;
  public viewOne: boolean = false;

  // load if coupons were purchased from parent dashboard
  @Input() purchased: boolean;

  // emits method that opens modal
  @Output() openOne = new EventEmitter<Coupon>();

  constructor(
    private genService: GeneralService,
    private dataStore: DataStoreService,
    private authService: LoginService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // load and set usertype from authService
    this.authService.activeUser.subscribe(user => {
      if (!!user) this.usertype = user.usertype;
    });

    // load avalible coupons from data store and if relavent set to coupons
    this.dataStore.availableCouponsFiltered.subscribe(avCoups => {
      if (avCoups != null && this.title == "Available Coupons")
        this.coupons = [...avCoups];
    });
    // load purchased coupons from data store and if relavent set to coupons
    this.dataStore.purchasedCouponsFiltered.subscribe(pCoups => {
      if (pCoups != null && this.title == "Purchased Coupons")
        this.coupons = [...pCoups];
    });

    // load company coupons from datastore and if relavent set to coupons
    if (this.usertype == "company")
      this.dataStore.companyCouponsFiltered.subscribe(
        cCoups => (this.coupons = cCoups != null ? [...cCoups] : null)
      );
  }

  // set values for modal and emit method to call modal
  clickedRowButton(coup: Coupon, event) {
    this.dataStore.purchased = this.purchased;
    this.openOne.emit(coup);
    this.viewType = event.target.value;
    this.viewOne = true;
  }
  // open add coupon modal
  openAddCoupon() {
    this.viewType = "add";
    this.viewOne = true;
  }
  // close modal
  onClose() {
    this.viewType = null;
    this.viewOne = false;
  }

  // delete coupon
  onDelete(coup) {
    // store coupon title for user notification
    let title = coup.title;
    // delete coupon from db
    this.genService.deleteItem(coup, "coupon").subscribe(
      () => {
        // notify user that coupon has been deleted
        this.messageService.message.next(`${title} was deleted`);

        // updated coupons in dataStore
        if (this.usertype == "customer") this.dataStore.setCustomerCoupons();
        else this.dataStore.setCompanyCoupons();
      },
      err => this.messageService.message.next("Error deleting Coupon: " + err)
    );
  }
}

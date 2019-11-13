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
  public reactiveCoupons: Coupon[];

  public currentCoupons: Coupon[];
  @Input() public sections: ListElement[];
  public usertype: string;
  @Input() public title: string;
  public viewType: string;
  public viewOne: boolean = false;
  @Input() purchased: boolean;
  @Output() openOne = new EventEmitter<Coupon>();

  constructor(
    private genService: GeneralService,
    private dataStore: DataStoreService,
    private authService: LoginService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.authService.activeUser.subscribe(user => {
      if (!!user) this.usertype = user.usertype;
    });
    this.dataStore.availableCouponsFiltered.subscribe(avCoups => {
      if (avCoups != null && this.title == "Available Coupons")
        this.reactiveCoupons = [...avCoups];
    });
    this.dataStore.purchasedCouponsFiltered.subscribe(pCoups => {
      if (pCoups != null && this.title == "Purchased Coupons")
        this.reactiveCoupons = [...pCoups];
    });

    if (this.usertype == "company")
      this.dataStore.companyCouponsFiltered.subscribe(
        cCoups => (this.reactiveCoupons = cCoups != null ? [...cCoups] : null)
      );
  }

  clickedRowButton(coup: Coupon, event) {
    this.genService.purchased = this.purchased;
    this.openOne.emit(coup);
    this.viewType = event.target.value;
    this.viewOne = true;
  }
  openAddCoupon() {
    this.viewType = "add";
    this.viewOne = true;
  }
  onClose() {
    this.viewType = null;
    this.viewOne = false;
  }

  onDelete(coup) {
    let title = coup.title;
    this.genService.deleteItem(coup, "coupon").subscribe(
      () => {
        this.messageService.message.next(`${title} was deleted`);
        if (this.usertype == "customer") this.dataStore.setCustomerCoupons();
        else this.dataStore.setCompanyCoupons();
      },
      err => this.messageService.message.next("Error deleting Coupon: " + err)
    );
  }
}

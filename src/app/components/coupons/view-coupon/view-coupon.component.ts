import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { Coupon } from "src/models/coupon";
import { Router } from "@angular/router";
import { ListElement } from "src/models/listElement";
import { DataStoreService } from "src/app/services/data-store.service";
import lists from "../../../../utils/lists";
import { LoginService } from "src/app/services/login.service";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-view-coupon",
  templateUrl: "./view-coupon.component.html",
  styleUrls: ["./view-coupon.component.scss"]
})
export class ViewCouponComponent implements OnInit {
  public coupon: Coupon;
  public usertype: string;
  public purchased: boolean;

  // load section from utils/lists
  public rightSection: ListElement[] = lists.couponsViewRightSection;
  // emit close modal method to parent component
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private genService: GeneralService,
    private router: Router,
    private authService: LoginService,
    private messageService: MessageService,
    private dataStore: DataStoreService
  ) {}

  ngOnInit() {
    // load coupon from data store and set to local variable
    this.dataStore.coupon.subscribe(
      coupon => (this.coupon = coupon),
      err => this.messageService.message.next(err)
    );

    // load usertype from auth service and set to varaible
    // need this to add buttons dynamically
    this.authService.activeUser.subscribe(
      user => {
        if (!!user) this.usertype = user.usertype;
      },
      err => this.messageService.message.next(err)
    );
    // load purchased value from datastore and set to variable
    // this is to add purchase button dynamically to component
    this.purchased = this.dataStore.purchased;
  }

  // purchase coupon method
  purchaseCoupon() {
    // purchase coupon , notify user, close modal and reload coupons
    this.genService.purchaseCoupon(this.coupon).subscribe(
      () => {
        this.messageService.message.next(`${this.coupon.title} purchased`);
        this.close.emit();
        this.router.navigate(["/home"]);
      },
      err => this.messageService.message.next(err)
    );
  }
}

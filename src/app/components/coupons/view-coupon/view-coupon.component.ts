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
  public rightSection: ListElement[] = lists.couponsViewRightSection;
  public usertype: string;

  @Input() public purchased: boolean;

  constructor(
    private genService: GeneralService,
    private router: Router,
    private authService: LoginService,
    private messageService: MessageService,
    private dataStore: DataStoreService
  ) {}
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() reload = new EventEmitter<Coupon>();

  ngOnInit() {
    this.dataStore.coupon.subscribe(
      coupon => (this.coupon = coupon),
      err => this.messageService.message.next(err)
    );

    this.authService.activeUser.subscribe(
      user => (this.usertype = user.usertype),
      err => this.messageService.message.next(err)
    );
    this.purchased = this.genService.purchased;
  }

  purchaseCoupon() {
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

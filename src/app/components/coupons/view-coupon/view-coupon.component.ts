import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { Coupon } from "src/models/coupon";
import { Router } from "@angular/router";
import { ListElement } from "src/models/listElement";
import { DataStoreService } from "src/app/services/data-store.service";

@Component({
  selector: "app-view-coupon",
  templateUrl: "./view-coupon.component.html",
  styleUrls: ["./view-coupon.component.scss"]
})
export class ViewCouponComponent implements OnInit {
  public coupon: Coupon;
  public newCoupon: Coupon;
  public rightSection: ListElement[];
  public usertype: string;
  @Input() public purchased: boolean;

  constructor(
    private genService: GeneralService,
    private router: Router,
    private dataStore: DataStoreService
  ) {}
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() reload = new EventEmitter<Coupon>();

  ngOnInit() {
    this.coupon = this.genService.coupon;
    this.usertype = JSON.parse(sessionStorage.user).usertype;
    this.purchased = this.genService.purchased;
    this.rightSection = this.dataStore.couponsViewRightSection;
  }

  deleteCoupon() {
    this.genService.deleteItem(this.coupon, "coupon").subscribe(
      () => {
        this.close.emit();
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
      }
    );
  }

  purchaseCoupon() {
    this.genService.purchaseCoupon(this.coupon).subscribe(coup => {
      this.close.emit();
      this.router.navigate(["/home"]);
    });
  }
}

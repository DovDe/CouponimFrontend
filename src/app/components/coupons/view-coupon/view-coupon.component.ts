import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { Coupon } from "src/models/coupon";
import { Router } from "@angular/router";
import { ListElement } from "src/models/listElement";

@Component({
  selector: "app-view-coupon",
  templateUrl: "./view-coupon.component.html",
  styleUrls: ["./view-coupon.component.scss"]
})
export class ViewCouponComponent implements OnInit {
  public coupon;
  public newCoupon;
  public rightSection: ListElement[];
  public usertype: string;
  public purchased: boolean;
  constructor(private genService: GeneralService, private router: Router) {}
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() reload = new EventEmitter<Coupon>();

  ngOnInit() {
    this.coupon = this.genService.coupon;
    this.usertype = sessionStorage.usertype;
    this.purchased = this.genService.purchased;
    console.log(this.purchased);

    this.rightSection = [
      new ListElement("startDate", "Start Date", null, true, "date"),
      new ListElement("endDate", "End Date", null, true, "date"),
      new ListElement("amount", "Amount", null, true, "text"),
      new ListElement("price", "Price", null, true, "number")
    ];
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

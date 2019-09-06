import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Coupon } from "src/models/coupon";
import { ListElement } from "src/models/listElement";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-coupons",
  templateUrl: "./coupons.component.html",
  styleUrls: ["./coupons.component.scss"]
})
export class CouponsComponent implements OnInit {
  @Input() public coupons: Coupon[];
  @Input() public sections: ListElement[];
  @Input() public usertype: string;
  @Input() public title: string;
  public purchasedCoupons: Coupon[];
  public viewType: string;
  public viewOne: boolean = false;
  @Input() purchased: boolean;
  @Output() openOne = new EventEmitter<Coupon>();

  constructor(private genService: GeneralService) {}

  ngOnInit() {}

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

  onDelete() {}

  onFilter() {}
}

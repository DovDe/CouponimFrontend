import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { Coupon } from "src/models/coupon";
import { NgForm } from "@angular/forms";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-coupon",
  templateUrl: "./edit-coupon.component.html",
  styleUrls: ["./edit-coupon.component.scss"]
})
export class EditCouponComponent implements OnInit {
  public coupon: Coupon;

  @ViewChild("f", { static: true }) editCoupon: NgForm;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private genService: GeneralService, private router: Router) {}

  ngOnInit() {
    this.coupon = this.genService.coupon;
  }

  updateCoupon() {
    this.genService.updateItem(this.coupon, "coupon").subscribe(
      () => {
        this.close.emit();
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
      }
    );
  }
}

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { Coupon } from "src/models/coupon";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-add-coupon",
  templateUrl: "./add-coupon.component.html",
  styleUrls: ["./add-coupon.component.scss"]
})
export class AddCouponComponent implements OnInit {
  public newCoupon: Coupon = new Coupon();

  constructor(private genService: GeneralService, private router: Router) {}

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild("f", { static: true }) addForm: NgForm;

  ngOnInit() {}

  addCoupon() {
    this.genService.addItem(this.addForm.value, "coupon").subscribe(
      () => {
        this.close.emit();
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
        this.router.navigate(["/home"]);
      }
    );
  }
}

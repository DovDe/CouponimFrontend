import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Coupon } from "src/models/coupon";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
import { DataStoreService } from "src/app/services/data-store.service";
import lists from "../../../../utils/lists";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-edit-coupon",
  templateUrl: "./edit-coupon.component.html",
  styleUrls: ["./edit-coupon.component.scss"]
})
export class EditCouponComponent implements OnInit {
  public coupon: Coupon;
  public updateCouponForm: FormGroup;
  public sections = lists.editCouponSections;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private genService: GeneralService,
    private router: Router,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.dataStore.coupon.subscribe(coupon => (this.coupon = coupon));

    this.updateCouponForm = new FormGroup({
      categoryName: new FormControl(this.coupon.categoryName, [
        Validators.required
      ]),
      startDate: new FormControl(this.coupon.startDate, [Validators.required]),
      endDate: new FormControl(this.coupon.endDate, [Validators.required]),
      description: new FormControl(this.coupon.description),
      amount: new FormControl(this.coupon.amount, [Validators.required]),
      price: new FormControl(this.coupon.price, [Validators.required]),
      image: new FormControl(this.coupon.image, [Validators.required])
    });
  }

  updateCoupon() {
    this.genService.updateItem(this.coupon, "coupon").subscribe(
      () => {
        this.close.emit();
        this.router.navigate(["/home"]);
      },
      err => this.messageService.message.next(err)
    );
  }
  isValid(i) {
    let val = this.updateCouponForm.get(`${this.sections[i].dbName}`);
    return val.touched && val.invalid;
  }
  getSection(i) {
    return this.updateCouponForm.get(`${this.sections[i].dbName}`);
  }
}

import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Coupon } from "src/models/coupon";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ListElement } from "src/models/listElement";
import { MessageService } from "src/app/services/message.service";
import lists from "../../../../utils/lists";
import { checkDateFromNow, dateRangeValidator } from "src/utils/formValidators";

@Component({
  selector: "app-add-coupon",
  templateUrl: "./add-coupon.component.html",
  styleUrls: ["./add-coupon.component.scss"]
})
export class AddCouponComponent implements OnInit {
  public newCoupon: Coupon = new Coupon();
  public addCouponForm: FormGroup;
  public sections: ListElement[] = lists.addCouponSections;
  constructor(
    private genService: GeneralService,
    private router: Router,
    private messageService: MessageService
  ) {}

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.addCouponForm = new FormGroup(
      {
        categoryName: new FormControl(null, [Validators.required]),
        title: new FormControl(null, [Validators.required]),
        startDate: new FormControl(null, [
          Validators.required,
          checkDateFromNow()
        ]),
        endDate: new FormControl(null, [Validators.required]),
        description: new FormControl(null),
        amount: new FormControl(null, [Validators.required]),
        price: new FormControl(null, [Validators.required]),
        image: new FormControl(null, [Validators.required])
      },
      { validators: [dateRangeValidator] }
    );
  }

  isValid(i) {
    let val = this.addCouponForm.get(`${this.sections[i].dbName}`);
    return val.touched && val.invalid;
  }
  getSection(i) {
    return this.addCouponForm.get(`${this.sections[i].dbName}`);
  }
  checkDateError() {
    let arr = [];
    for (let key in this.addCouponForm.errors) {
      arr.push(key);
    }
    return arr.includes("range");
  }

  addCoupon() {
    if (this.addCouponForm.invalid)
      this.messageService.message.next("The form is invalid please fix it");
    else {
      this.genService.addItem(this.addCouponForm.value, "coupon").subscribe(
        () => {
          this.messageService.message.next(
            this.addCouponForm.get("title").value + " was added to coupons"
          );
          this.close.emit();
          this.router.navigate(["/home"]);
        },
        err => this.messageService.message.next(err)
      );
    }
  }
}

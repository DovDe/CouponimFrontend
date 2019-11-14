import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Coupon } from "src/models/coupon";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
import { DataStoreService } from "src/app/services/data-store.service";
import lists from "../../../../utils/lists";
import { MessageService } from "src/app/services/message.service";
import { checkDateFromNow, dateRangeValidator } from "src/utils/formValidators";

@Component({
  selector: "app-edit-coupon",
  templateUrl: "./edit-coupon.component.html",
  styleUrls: ["./edit-coupon.component.scss"]
})
export class EditCouponComponent implements OnInit {
  public coupon: Coupon;
  public updateCouponForm: FormGroup;

  // load form sections from utils/lists
  public sections = lists.editCouponSections;

  // emit method to close modal
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private genService: GeneralService,
    private router: Router,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // load coupon data from data store and set to local variable
    this.dataStore.coupon.subscribe(coupon => (this.coupon = coupon));

    // setup form with validation
    this.updateCouponForm = new FormGroup(
      {
        categoryName: new FormControl(this.coupon.categoryName, [
          Validators.required
        ]),
        startDate: new FormControl(this.coupon.startDate, [
          Validators.required,
          // verify that dateSelected is not in the past
          checkDateFromNow()
        ]),
        endDate: new FormControl(this.coupon.endDate, [Validators.required]),
        description: new FormControl(this.coupon.description),
        amount: new FormControl(this.coupon.amount, [Validators.required]),
        price: new FormControl(this.coupon.price, [Validators.required]),
        image: new FormControl(this.coupon.image, [Validators.required])
      },
      // verify that the startDate is before the endDate
      { validators: [dateRangeValidator] }
    );
  }

  updateCoupon() {
    // if form is invalid notify user and skip update
    if (this.updateCouponForm.invalid)
      this.messageService.message.next("The form is invalid");
    else {
      // update coupon in db
      this.genService.updateItem(this.coupon, "coupon").subscribe(
        () => {
          this.messageService.message.next(`${this.coupon.title} was updated`);
          this.close.emit();
          this.router.navigate(["/home"]);
        },
        err => this.messageService.message.next(err)
      );
    }
  }
  // check if form is valid from html
  isValid(i) {
    let val = this.updateCouponForm.get(`${this.sections[i].dbName}`);
    return val.touched && val.invalid;
  }
  // get form control in html
  getSection(i) {
    return this.updateCouponForm.get(`${this.sections[i].dbName}`);
  }

  // check if error from dateRangeValidator exists
  checkDateError() {
    let arr = [];
    for (let key in this.updateCouponForm.errors) {
      arr.push(key);
    }
    return arr.includes("range");
  }
}

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
  // public newCoupon: Coupon = new Coupon();
  public addCouponForm: FormGroup;

  // load form sections from utils/lists
  public sections: ListElement[] = lists.addCouponSections;

  constructor(
    private genService: GeneralService,
    private router: Router,
    private messageService: MessageService
  ) {}

  // method emited to parent to close modal
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    // setup add coupon form with validation
    this.addCouponForm = new FormGroup(
      {
        categoryName: new FormControl(null, [Validators.required]),
        title: new FormControl(null, [Validators.required]),
        startDate: new FormControl(null, [
          Validators.required,
          // validation to verify the date selected is not in the past
          checkDateFromNow()
        ]),
        endDate: new FormControl(null, [Validators.required]),
        description: new FormControl(null),
        amount: new FormControl(null, [Validators.required]),
        price: new FormControl(null, [Validators.required]),
        image: new FormControl(null, [Validators.required])
      },
      // validation to verify that endDate is after startDate
      { validators: [dateRangeValidator] }
    );
  }

  // method to check if form is valid from html
  isValid(i) {
    let val = this.addCouponForm.get(`${this.sections[i].dbName}`);
    return val.touched && val.invalid;
  }
  // method to get form control from html
  getSection(i) {
    return this.addCouponForm.get(`${this.sections[i].dbName}`);
  }

  /**
   * method to check if date error was created from date range validator
   *
   * this method is probably not needed if I can figure out how to set
   * the error emited from the dateRangeValidator method to the
   * endDate input
   */
  checkDateError() {
    let arr = [];
    // loop through errors and push error names to array
    for (let key in this.addCouponForm.errors) {
      arr.push(key);
    }
    // check if error name range is in array
    return arr.includes("range");
  }

  // coupon to db
  addCoupon() {
    // check if form is invalid if so notify user and do not submit
    if (this.addCouponForm.invalid)
      this.messageService.message.next("The form is invalid please fix it");
    else {
      // add form to db
      this.genService.addItem(this.addCouponForm.value, "coupon").subscribe(
        () => {
          // notify user that coupon has been added to db
          this.messageService.message.next(
            this.addCouponForm.get("title").value + " was added to coupons"
          );
          // close modal and navigate back home
          this.close.emit();
          this.router.navigate(["/home"]);
        },
        err => this.messageService.message.next(err)
      );
    }
  }
}

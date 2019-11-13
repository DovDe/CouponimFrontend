import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Coupon } from "src/models/coupon";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ListElement } from "src/models/listElement";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-add-coupon",
  templateUrl: "./add-coupon.component.html",
  styleUrls: ["./add-coupon.component.scss"]
})
export class AddCouponComponent implements OnInit {
  public newCoupon: Coupon = new Coupon();
  public addCouponForm: FormGroup;
  public sections: ListElement[] = [
    new ListElement("title", "Title", "text"),
    new ListElement("startDate", "Start Date", "date"),
    new ListElement("endDate", "End Date", "date"),
    new ListElement("amount", "Inventory", "number"),
    new ListElement("price", "Price", "number"),
    new ListElement("image", "Image URL", "text")
  ];
  constructor(
    private genService: GeneralService,
    private router: Router,
    private messageService: MessageService
  ) {}

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.addCouponForm = new FormGroup({
      categoryName: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      amount: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required])
    });
  }

  isValid(i) {
    let val = this.addCouponForm.get(`${this.sections[i].dbName}`);
    return val.touched && val.invalid;
  }
  getSection(i) {
    return this.addCouponForm.get(`${this.sections[i].dbName}`);
  }

  addCoupon() {
    if (this.addCouponForm.status == "INVALID") {
      this.close.emit();
      this.router.navigate(["/home"]);
    } else {
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

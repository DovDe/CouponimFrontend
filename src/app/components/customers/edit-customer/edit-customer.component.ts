import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { Customer } from "src/models/customer";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { ActiveUser } from "src/models/active-user";

@Component({
  selector: "app-edit-customer",
  templateUrl: "./edit-customer.component.html",
  styleUrls: ["./edit-customer.component.scss"]
})
export class EditCustomerComponent implements OnInit {
  public customer: Customer;
  public firstName: string;
  public lastName: string;
  private user: ActiveUser;
  @ViewChild("f", { static: true }) editCustomer: NgForm;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private genService: GeneralService,
    private router: Router,
    private authService: LoginService
  ) {}

  ngOnInit() {
    this.customer = this.genService.customer;

    this.authService.activeUser.subscribe(user => {
      this.user = user;
    });
  }

  updateCustomer() {
    this.genService.updateItem(this.customer, "customer").subscribe(
      () => {
        this.close.emit();
        // this.router.navigate([`/home`]);
      },
      err => {
        console.log(err);
      }
    );
  }
}

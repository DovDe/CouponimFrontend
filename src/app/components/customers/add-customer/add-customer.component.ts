import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";
// import { ListElement } from "src/models/listElement";

@Component({
  selector: "app-add-customer",
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.scss"]
})
export class AddCustomerComponent implements OnInit {
  @ViewChild("f", { static: true }) addForm: NgForm;
  public firstname: string;
  public lastname: string;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private genService: GeneralService, private router: Router) {}

  ngOnInit() {}

  addCustomer() {
    this.genService.addItem(this.addForm.value, "customer").subscribe(
      () => {
        this.addForm.reset();
        this.close.emit();
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
        this.router.navigate(["/administrator"]);
      }
    );
    console.log(this.addForm);
  }
}

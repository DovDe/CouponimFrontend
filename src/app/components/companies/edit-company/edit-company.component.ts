import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { Company } from "src/models/company";
import { NgForm } from "@angular/forms";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-company",
  templateUrl: "./edit-company.component.html",
  styleUrls: ["./edit-company.component.scss"]
})
export class EditCompanyComponent implements OnInit {
  public company: Company;
  public oldPassword: string;
  @ViewChild("f", { static: true }) editCompany: NgForm;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private genService: GeneralService, private router: Router) {}

  ngOnInit() {
    this.company = this.genService.company;
  }

  updateCompany() {
    if (this.oldPassword == this.company.password) {
      this.genService.updateItem(this.company, "company").subscribe(
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
}

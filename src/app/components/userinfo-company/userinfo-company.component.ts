import { Component, OnInit } from "@angular/core";
import { Company } from "src/models/company";
import { DataStoreService } from "src/app/services/data-store.service";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-userinfo-company",
  templateUrl: "./userinfo-company.component.html",
  styleUrls: ["./userinfo-company.component.scss"]
})
export class UserinfoCompanyComponent implements OnInit {
  public company: Company;
  constructor(
    private dataStore: DataStoreService,
    private genService: GeneralService
  ) {}

  ngOnInit() {
    this.dataStore.userInfo.subscribe(user => {
      if (user != null) this.company = user;
      else {
        this.genService.getUserInfo().subscribe(userInfo => {
          this.company = userInfo;
        });
      }
    });
  }
}

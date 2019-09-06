import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  public usertype: string;

  constructor() {}

  ngOnInit() {
    this.usertype = sessionStorage.usertype;
  }
}

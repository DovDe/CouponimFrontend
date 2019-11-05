import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit() {
    if (sessionStorage.getItem("user") !== null) {
      this.authService.autoLogin();
    }
  }
}

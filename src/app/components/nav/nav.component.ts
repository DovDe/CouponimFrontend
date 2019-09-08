import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { GeneralService } from "src/app/services/general.service";
import { Company } from "src/models/company";
import { Customer } from "src/models/customer";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  public name: string;
  public user: any;

  constructor(
    private router: Router,
    private authService: LoginService,
    private genService: GeneralService
  ) {}

  ngOnInit() {
    this.authService.activeUser.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.name = "";

    this.authService.logout(sessionStorage.token).subscribe(
      () => {
        sessionStorage.removeItem("usertype");
        sessionStorage.removeItem("token");
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
      }
    );
  }

  showUserInfo() {
    switch (sessionStorage.usertype) {
      case "administrator":
        this.name = "Admin";
        console.log("admin");
        break;
      case "company":
        console.log(this.user.name);
        this.name = this.user.name;
        break;
      case "customer":
        this.name = `${this.user.firstName}`;
        console.log(this.user.firstName);
    }
  }
}

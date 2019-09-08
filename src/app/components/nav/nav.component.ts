import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { ActiveUser } from "src/models/active-user";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  public user: ActiveUser | undefined = undefined;

  constructor(private router: Router, private authService: LoginService) {}

  ngOnInit() {
    if (this.user == undefined) {
      this.authService.activeUser.subscribe(user => {
        this.user = user;
      });
    }
  }

  logout() {
    this.authService.logout(sessionStorage.token).subscribe(
      () => {
        sessionStorage.removeItem("token");
        this.user = undefined;
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
      }
    );
  }
}

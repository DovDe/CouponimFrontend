import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { ActiveUser } from "src/models/active-user";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  constructor(private router: Router, private authService: LoginService) {}

  ngOnInit() {
    // checks if there is a user thats logged in and re-routes accordingly
    this.authService.activeUser.subscribe(user => {
      if (!!user) this.router.navigate([`${user.usertype}`]);
    });
  }
}

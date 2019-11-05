import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  constructor(private router: Router, private authService: LoginService) {}

  ngOnInit() {
    this.authService.activeUser.subscribe(user => {
      if (!!user) this.router.navigate([`${user.usertype}`]);
    });
  }
}

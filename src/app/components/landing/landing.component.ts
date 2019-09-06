import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    if (sessionStorage.token && sessionStorage.usertype) {
      this.router.navigate([`/${sessionStorage.usertype}`]);
    }
  }
}

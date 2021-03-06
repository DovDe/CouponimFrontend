import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"]
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // if user tried to route to a non-existing route this component loads
    // after 3 seconds the user is re-routed to home
    setTimeout(() => {
      this.router.navigate(["/home"]);
    }, 3000);
  }
}

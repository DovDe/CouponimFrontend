import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"]
})
export class ErrorComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) {}

  // this component is not currently in use

  ngOnInit() {
    // this.errorMessage = this.route.snapshot.data["message"];
    this.route.data.subscribe((data: Data) => {
      this.errorMessage = data["message"];
    });
  }
}

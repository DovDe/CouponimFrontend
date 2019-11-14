import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loading-spinner",
  // See scss to understand why I added the html in this way
  template:
    '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  styleUrls: ["./loading-spinner.component.scss"]
})
export class LoadingSpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

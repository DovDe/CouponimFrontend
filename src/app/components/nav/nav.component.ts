import { Component, OnInit, OnChanges } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { ActiveUser } from "src/models/active-user";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit, OnChanges {
  public user: ActiveUser;
  public name: string;
  constructor(private authService: LoginService) {}

  ngOnInit() {
    this.authService.activeUser.subscribe(user => (this.user = user));
    this.authService.name.subscribe(name => (this.name = name));
  }

  ngOnChanges() {
    this.authService.name.subscribe(name => (this.name = name));
  }
  logout() {
    this.authService.logout(this.user.token);
  }
}

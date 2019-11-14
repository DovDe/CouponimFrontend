import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { ActiveUser } from "src/models/active-user";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  public user: ActiveUser;
  public name: string;

  constructor(private authService: LoginService) {}

  // variables to open userInfo modal
  public parentType: string;
  public viewOne: boolean = false;

  ngOnInit() {
    // load user and name then set local variable
    this.authService.activeUser.subscribe(user => (this.user = user));
    this.authService.name.subscribe(name => (this.name = name));
  }

  logout() {
    this.authService.logout(null);
  }

  // open userInfo modal
  openUserInfo() {
    this.viewOne = true;
    this.parentType = this.user.usertype;
  }

  // close userInfo modal
  onClose() {
    this.parentType = null;
    this.viewOne = false;
  }
}

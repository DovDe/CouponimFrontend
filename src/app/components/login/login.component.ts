import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { NgForm } from "@angular/forms";
import { ActiveUser } from "src/models/active-user";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public error: string;
  public usertypes: string[] = ["administrator", "company", "customer"];
  public isLoading: boolean = false;
  public usertype: string;
  constructor(
    private authService: LoginService,
    private router: Router,
    private genService: GeneralService
  ) {}

  ngOnInit() {
    this.usertype = this.usertypes[2];
  }

  login(form: NgForm) {
    if (!form.valid) return;
    this.isLoading = true;
    let { email, password, usertype } = form.value;
    this.authService
      .login({ email, password, usertype })
      .subscribe(
        resData => {
          this.isLoading = false;
          let { token } = resData;
          let tokenExpiration = new Date().getTime() + 1000 * 60 * 30;
          let user: ActiveUser = ActiveUser.getInstance();
          if (token) {
            this.authService.loggedIn = true;
            sessionStorage.setItem(
              "user",
              JSON.stringify({
                usertype,
                token,
                tokenExpiration
              })
            );

            user.usertype = usertype;
            user.token = token;
            user.tokenExpiration = tokenExpiration;
            this.authService.activeUser.next(user);
          }
        },
        err => {
          console.log("error " + err);

          this.isLoading = false;
          this.error = err;
        }
      )
      .add(() => {
        // if (!sessionStorage.user) return;
        if (JSON.parse(sessionStorage.user).usertype !== "administrator") {
          this.genService.getUserInfo().subscribe(userInfo => {
            let name = userInfo.firstName || userInfo.name;
            this.authService.name.next(name);
            sessionStorage.setItem("name", name);
          });
        } else {
          sessionStorage.setItem("name", "Admin");
          this.authService.name.next("Admin");
        }
        this.router.navigate([`/${usertype}`]);
      });
    form.reset();
  }
}

import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { NgForm } from "@angular/forms";
import { ActiveUser } from "src/models/active-user";
import { GeneralService } from "src/app/services/general.service";
import { DataStoreService } from "src/app/services/data-store.service";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  // public error: string;
  public usertypes: string[] = ["administrator", "company", "customer"];
  // public isLoading: boolean = false;
  public usertype: string;
  constructor(
    private authService: LoginService,
    private genService: GeneralService,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // sets form usertype
    this.usertype = this.usertypes[2];

    // checks for user session storage and if exists fired autologin
    let user = sessionStorage.getItem("user");
    if (!!user) {
      this.authService.autoLogin();
      // fires an interval method that checks the validity of the token
      this.authService.checkLoggedInLoop();
    }
  }

  login(form: NgForm) {
    // if the form is invalid notify user and return
    if (form.invalid) {
      this.messageService.message.next("The form is invalid");
      return;
    }

    //  get form values
    let { email, password, usertype } = form.value;

    // call authService to login with form data
    this.authService
      .login({ email, password, usertype })
      .subscribe(
        resData => {
          let { token } = resData;

          // check token
          if (!!token) {
            // instantiate user singleton and set expiration time to local variable
            let user: ActiveUser = ActiveUser.getInstance();
            let tokenExpiration = new Date().getTime() + 1000 * 60 * 30;

            // set session storage
            sessionStorage.setItem(
              "user",
              JSON.stringify({
                usertype,
                token,
                tokenExpiration
              })
            );

            // set user singleton values
            user.usertype = usertype;
            user.token = token;
            user.tokenExpiration = tokenExpiration;

            // update global active user
            this.authService.activeUser.next(user);
          }
        },
        err => {
          this.messageService.message.next(err.error);
        }
      )
      // this method is fired after previous method is finished
      .add(() => {
        // check usertype
        if (this.usertype !== "administrator") {
          // load user info from db
          this.genService.getUserInfo().subscribe(userInfo => {
            // store userInfo globaly
            this.dataStore.userInfo.next(userInfo);

            // set local name variable depending on usertype
            let name = userInfo.firstName || userInfo.name;
            // store users name globaly and set in session storage
            this.authService.name.next(name);
            sessionStorage.setItem("name", name);
          });
        } else {
          // store admin as name globaly and set in session storage
          sessionStorage.setItem("name", "Admin");
          this.authService.name.next("Admin");
        }
      });
  }
}

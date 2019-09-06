import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public usertype: string;
  public password: string;
  public email: string;
  public message: string;
  public error: boolean = false;

  constructor(
    private service: LoginService,
    private router: Router,
    private genService: GeneralService
  ) {}
  public usertypes = ["administrator", "company", "customer"];
  ngOnInit() {
    if (sessionStorage.usertype) {
      this.router.navigate([`${sessionStorage.usertype}`]);
    }
  }

  public changeUserType(e) {
    this.usertype = e.target.value;
  }

  login() {
    let login = {
      email: this.email,
      password: this.password,
      usertype: this.usertype
    };
    this.service.login(login).subscribe(
      res => {
        if (res.token) {
          sessionStorage.token = res.token;
          sessionStorage.usertype = this.usertype;
          this.service.loggedIn = true;
          this.service.usertype = this.usertype;

          this.genService.getUserInfo().subscribe(data => {
            this.service.user = data;
          });

          this.router.navigate([`/${this.usertype}`]);
        }
      },
      err => {
        this.error = true;
        this.message = err.error;
        setTimeout(() => {
          this.message = null;
          this.error = false;
        }, 3000);
      }
    );
  }

  onHandleError() {
    // console.log("onHandleError");

    this.error = false;
    this.message = null;
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public error: string;
  public usertype: string;
  public usertypes: string[] = ["administrator", "company", "customer"];
  public isLoading: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  login(form: NgForm) {
    if (!form.valid) return;
    this.isLoading = true;
    let { email, password, usertype } = form.value;

    this.loginService.login({ email, password, usertype }).subscribe(
      resData => {
        this.isLoading = false;
        if (resData.token) {
          this.loginService.loggedIn = true;
          this.router.navigate([`/${usertype}`]);
        }
      },
      err => {
        this.isLoading = false;
        this.error = err;
      }
    );
    form.reset();
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject, interval } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ActiveUser } from "src/models/active-user";
import { Router } from "@angular/router";
import { MessageService } from "./message.service";

interface loginResponseData {
  token: string;
}

@Injectable({
  providedIn: "root"
})
export class LoginService {
  public activeUser = new BehaviorSubject<ActiveUser>(null);

  public loggedIn: boolean;
  public usertype: string;
  public user: ActiveUser;
  public name = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
    this.activeUser.subscribe(user => (this.user = user));
  }

  public login(login: {
    email: string;
    password: string;
    usertype: string;
  }): Observable<loginResponseData> {
    let { email, password, usertype } = login;
    this.usertype = usertype;
    return this.http
      .post<loginResponseData>(
        `http://localhost:8080/login?email=${email}&password=${password}&type=${usertype}`,
        {}
      )
      .pipe(catchError(this.handleError), tap(this.handelAuth));
  }

  public logout(message: string): void {
    let token;
    if (!!sessionStorage.getItem("user"))
      token = JSON.parse(sessionStorage.getItem("user")).tokenExpiration;
    else token = this.user.token;

    this.user = null;
    this.activeUser.next(null);
    this.http
      .post<any>(`http://localhost:8080/logout/${token}`, {})
      .subscribe(() => {
        this.messageService.message.next(
          message || `${sessionStorage.getItem("name")} has been logged out`
        );
        this.name.next(null);
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("user");
        this.router.navigate(["/home"]);
      });
  }

  private handleError(errRes: HttpErrorResponse) {
    let errMessage = "An unknown error occurred";
    if (!errRes.error) return throwError(errMessage);
    errMessage = errRes.error;
    switch (errRes.error) {
      case "Wrong type":
        errMessage = "please select a user type";
    }
    return throwError(errMessage);
  }

  private handelAuth(resData) {
    let { token } = resData;
    if (!token) throwError("No Token Recieved Server Side Error");
  }

  checkLoggedInLoop() {
    return interval(1000 * 60).subscribe(() => {
      if (!!sessionStorage.getItem("user")) {
        let tokenExpiration = JSON.parse(sessionStorage.getItem("user"))
          .tokenExpiration;

        if (tokenExpiration < Date.now()) {
          this.logout(
            "token no longer valid user logged out please login to continue use of app"
          );
        }
      }
    });
  }
  autoLogin() {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (!userData || userData.tokenExpiration < new Date().getTime()) {
      sessionStorage.clear();
      this.router.navigate(["/home"]);
      return;
    }
    const loadedUser: ActiveUser = ActiveUser.getInstance();
    loadedUser.usertype = userData.usertype;
    loadedUser.token = userData.token;
    loadedUser.tokenExpiration = userData.tokenExpiration;
    this.user = loadedUser;
    this.activeUser.next(loadedUser);
    let name = sessionStorage.name;
    this.name.next(name);
  }
}

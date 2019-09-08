import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, Subject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ActiveUser } from "src/models/active-user";

interface loginResponseData {
  token: string;
}

@Injectable({
  providedIn: "root"
})
export class LoginService {
  public loggedIn: boolean;
  public usertype: string;
  public activeUser = new Subject<ActiveUser>();
  constructor(private http: HttpClient) {}

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
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handelAuth(resData);
        })
      );
  }

  public logout(token): Observable<any> {
    sessionStorage.removeItem(token);
    this.activeUser.next(null);
    return this.http.post<any>(`http://localhost:8080/logout/${token}`, {});
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
    if (token) {
      this.getUserInfo(token);
      sessionStorage.token = token;
    }
  }

  private getUserInfo(token: string): void {
    let user = ActiveUser.getInstance();
    user.usertype = this.usertype;
    user.token = token;

    if (this.usertype === "administrator") {
      user.name = "Admin";
      user.email = "admin@email.com";
      user.password = "admin";
      this.activeUser.next(user);
    } else {
      this.http
        .get<any>(`http://localhost:8080/${this.usertype}/${token}`)
        .subscribe(userInfo => {
          user.email = userInfo.email;
          user.password = userInfo.password;
          user.name =
            this.usertype == "company" ? userInfo.name : userInfo.firstName;

          this.activeUser.next(user);
        });
    }
  }
}

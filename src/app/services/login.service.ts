import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, Subject } from "rxjs";
import { Login } from "src/models/login";
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

  public login(login: Login): Observable<loginResponseData> {
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
    let expiration = new Date().getTime() + 1000 * 60 * 30;
    let user;

    if (this.usertype === "administrator") {
      user = new ActiveUser(
        "Admin",
        "administrator",
        "1",
        "admin@email.com",
        "admin",
        token,
        expiration
      );
      this.activeUser.next(user);
    } else {
      this.http
        .get<any>(`http://localhost:8080/${this.usertype}/${token}`)
        .subscribe(userInfo => {
          switch (this.usertype) {
            case "administrator":
              break;
            case "company":
              user = new ActiveUser(
                userInfo.name,
                "company",
                userInfo.id,
                userInfo.email,
                userInfo.password,
                token,
                expiration
              );
              break;
            default:
              user = new ActiveUser(
                `${userInfo.firstName} ${userInfo.lastName}`,
                "customer",
                userInfo.id,
                userInfo.email,
                userInfo.password,
                token,
                expiration
              );
          }
          this.activeUser.next(user);
        });
    }
  }
}

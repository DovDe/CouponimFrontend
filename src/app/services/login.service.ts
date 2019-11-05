import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, Subject, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ActiveUser } from "src/models/active-user";
import { Router } from "@angular/router";

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

  constructor(private http: HttpClient, private router: Router) {
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
      .pipe(
        catchError(this.handleError),
        tap(this.handelAuth)
      );
  }

  public logout(token): void {
    this.user = null;
    this.activeUser.next(null);
    this.http
      .post<any>(`http://localhost:8080/logout/${token}`, {})
      .subscribe(() => {
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

  autoLogin() {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (!userData) return;
    if (userData.tokenExpiration < new Date().getTime()) return;
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

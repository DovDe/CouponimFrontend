import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject, interval } from "rxjs";
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

  // sends post method to login and returns
  public login(login: {
    email: string;
    password: string;
    usertype: string;
  }): Observable<loginResponseData> {
    // set local variables
    let { email, password, usertype } = login;
    // set local usertype value
    this.usertype = usertype;

    // login with db
    return this.http.post<loginResponseData>(
      `http://localhost:8080/login?email=${email}&password=${password}&type=${usertype}`,
      {}
    );
    // .pipe(catchError(this.handleError), tap(this.handelAuth));
  }

  public logout(message: string): void {
    // store token for logout
    let token;
    let user = sessionStorage.getItem("user");

    if (!!user) token = JSON.parse(user).token;
    else token = this.user.token;

    // set local and global user activeUser and name to null

    this.user = null;
    this.activeUser.next(null);
    this.name.next(null);

    // logout user
    this.http
      .post<any>(`http://localhost:8080/logout/${token}`, {})
      .subscribe(() => {
        // if logout was successful notify user and clear session storage
        this.messageService.message.next(
          message || `${sessionStorage.getItem("name")} has been logged out`
        );
        sessionStorage.clear();
        // navigate home
        this.router.navigate(["/home"]);
      });
  }

  // method to catch http errors
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

  // this method return an interval that checks the validity of the current token
  checkLoggedInLoop() {
    // rxJS interval runs once a minute
    return interval(1000 * 60).subscribe(() => {
      // if token expiration is less than current time user is logged out
      let message = "token timed out -- please login to continue use of app";
      let user = sessionStorage.getItem("user");
      if (!!user) this.logout(message);
      if (JSON.parse(user).tokenExpiration < Date.now()) this.logout(message);
    });
  }

  // fired from layout component only if there is a user in session storage
  autoLogin() {
    const userData = JSON.parse(sessionStorage.getItem("user"));

    // checks if token is still valid
    if (userData.tokenExpiration < new Date().getTime()) {
      // clear storage and navigate home
      sessionStorage.clear();
      this.router.navigate(["/home"]);
      return;
    }
    // instantiate active user
    const loadedUser: ActiveUser = ActiveUser.getInstance();

    // set user values based on session Storage
    loadedUser.usertype = userData.usertype;
    loadedUser.token = userData.token;
    loadedUser.tokenExpiration = userData.tokenExpiration;

    // set local variable to instantiated active user
    this.user = loadedUser;
    // update active user gloabaly
    this.activeUser.next(loadedUser);
    // get name from storage and set globaly
    let name = sessionStorage.name;
    this.name.next(name);
  }
}

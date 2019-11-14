import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { LoginService } from "./login.service";
import { take, exhaustMap } from "rxjs/operators";
import { ActiveUser } from "src/models/active-user";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: LoginService) {}

  // intercept http request and add token
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.activeUser.pipe(
      take(1),
      exhaustMap(user => {
        let modReq;
        // if the user is not logged in there is not need to modify the url
        if (!user) return next.handle(req);
        // if token is invalid logout user
        if (user.tokenExpiration < Date.now())
          this.authService.logout(
            "user is no longer validated please login again"
          );

        // setup new request URL
        modReq = req.clone({ ...req, url: `${req.url}/${user.token}` });
        return next.handle(modReq);
      })
    );
  }
}

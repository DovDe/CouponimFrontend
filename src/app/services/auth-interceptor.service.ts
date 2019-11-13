import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { LoginService } from "./login.service";
import { take, exhaustMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.activeUser.pipe(
      take(1),
      exhaustMap(user => {
        let modReq;
        if (!user) return next.handle(req);
        let seshUser = JSON.parse(sessionStorage.getItem("user"));
        if (
          seshUser.tokenExpiration < Date.now() ||
          user.tokenExpiration < Date.now()
        ) {
          this.authService.logout(
            "user is no longer validated please login again"
          );
        }
        modReq = req.clone({ ...req, url: `${req.url}/${user.token}` });
        return next.handle(modReq);
      })
    );
  }
}

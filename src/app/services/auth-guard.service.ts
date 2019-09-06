import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.loggedIn == true) return true;
    let toRoute = route.url[0].path;

    switch (toRoute) {
      case "administrator":
        return sessionStorage.usertype == "administrator";
      case "company":
        return sessionStorage.usertype == "company";
      case "customer":
        return sessionStorage.usertype == "customer";
      default:
        break;
    }
    this.router.navigate(["/home"]);
  }
}

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
    // load usertype from route
    let toRoute = route.url[0].path;
    // check if the authService user is null navigate home
    if (this.authService.user == null) this.router.navigate(["/home"]);
    //  if the authService usertype = the usertype from the route return true
    if (this.authService.user.usertype == toRoute) return true;
  }
}

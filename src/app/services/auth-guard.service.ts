import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let toRoute = route.url[0].path;
    if (this.authService.user == null) this.router.navigate(["/home"]);
    if (this.authService.user.usertype == toRoute) return true;
    else {
      this.messageService.message.next(
        "Sorry you are not authorized to access this route --- you were re-routed to a route that you can access"
      );
      this.router.navigate(["/home"]);
    }
  }
}

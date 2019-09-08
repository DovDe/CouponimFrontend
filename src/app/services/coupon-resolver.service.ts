import { Injectable } from "@angular/core";
import { GeneralService } from "./general.service";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Coupon } from "src/models/coupon";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root"
})
export class CouponResolverService implements Resolve<Coupon[]> {
  constructor(
    private genService: GeneralService,
    private loginService: LoginService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.genService.getItemArray("coupon", this.loginService.usertype);
  }
}

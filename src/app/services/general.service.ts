import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Coupon } from "src/models/coupon";
import { LoginService } from "./login.service";
import { ActiveUser } from "src/models/active-user";
@Injectable({
  providedIn: "root"
})
export class GeneralService {
  private user: ActiveUser;
  private usertype: string;
  private BASEURL = `http://localhost:8080/`;

  constructor(private http: HttpClient, private authService: LoginService) {
    // load user from data store
    this.authService.activeUser.subscribe(user => {
      this.user = user;
      if (!!user) this.usertype = user.usertype;
    });
  }

  // method to update token experation
  private updateTokenExpiration() {
    this.user.tokenExpiration = Date.now() + 1000 * 60 * 30; // 30 minutes from current time
    this.authService.activeUser.next(this.user);
  }
  // get user info from DB
  public getUserInfo(): Observable<any> {
    this.updateTokenExpiration();
    return this.http.get<any>(`${this.BASEURL}${this.usertype}`);
  }

  // public getAvailableCoupons(): Observable<Coupon[]> {
  //   this.updateTokenExpiration();
  //   return this.http.get<any>(
  //     `${this.BASEURL}${this.usertype}/coupon/notpurchased`
  //   );
  // }

  // get purchased coupons from DB
  public getPurchasedCoupon(): Observable<Coupon[]> {
    this.updateTokenExpiration();
    return this.http.get<any>(
      `${this.BASEURL}${this.usertype}/coupon/purchased`
    );
  }

  // add coupon company or customer to DB
  public addItem(item: any, type: string): Observable<any> {
    this.updateTokenExpiration();
    return this.http.post<any>(`${this.BASEURL}${this.usertype}/${type}`, item);
  }

  // update coupon company or customer
  public updateItem(item: any, type: string): Observable<any> {
    this.updateTokenExpiration();
    return this.http.put(`${this.BASEURL}${this.usertype}/${type}`, item);
  }
  // delete coupon compant or customer
  public deleteItem(item: any, type: string): Observable<any> {
    this.updateTokenExpiration();
    return this.http.delete(
      `${this.BASEURL}${this.usertype}/${type}/${item.id}`
    );
  }

  // get coupons companies or customers
  public getItemArray(itemType: string): Observable<any[]> {
    this.updateTokenExpiration();
    return this.http.get<any[]>(`${this.BASEURL}${this.usertype}/${itemType}`);
  }

  // purchase coupon
  public purchaseCoupon(coup: Coupon): Observable<any> {
    this.updateTokenExpiration();
    return this.http.post(`${this.BASEURL}${this.usertype}/coupon`, coup);
  }
}

import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Coupon } from "src/models/coupon";
import { Customer } from "src/models/customer";
import { Company } from "src/models/company";
import { LoginService } from "./login.service";
import { ActiveUser } from "src/models/active-user";
@Injectable({
  providedIn: "root"
})
export class GeneralService {
  public purchased: boolean;

  public customer: Customer;
  public company: Company;
  public coupon: Coupon;

  private user: ActiveUser;
  private BASEURL = `http://localhost:8080/`;

  constructor(private http: HttpClient, private authService: LoginService) {
    this.authService.activeUser.subscribe(user => {
      this.user = user;
    });
  }

  public getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}${this.user.usertype}`);
  }

  public getAvailableCoupons(): Observable<Coupon[]> {
    return this.http.get<any>(
      `${this.BASEURL}${this.user.usertype}/coupon/notpurchased`
    );
  }
  public getPurchasedCoupon(): Observable<Coupon[]> {
    return this.http.get<any>(
      `${this.BASEURL}${this.user.usertype}/coupon/purchased`
    );
  }

  public addItem(item: any, type: string): Observable<any> {
    return this.http.post<any>(
      `${this.BASEURL}${this.user.usertype}/${type}`,
      item
    );
  }

  public updateItem(item: any, type: string): Observable<any> {
    return this.http.put(`${this.BASEURL}${this.user.usertype}/${type}`, item);
  }
  public deleteItem(item: any, type: string): Observable<any> {
    return this.http.delete(
      `${this.BASEURL}${this.user.usertype}/${type}/${item.id}`
    );
  }

  public getItemArray(itemType: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.BASEURL}${this.user.usertype}/${itemType}`
    );
  }

  public purchaseCoupon(coup: Coupon): Observable<any> {
    return this.http.post(`${this.BASEURL}${this.user.usertype}/coupon`, coup);
  }
}

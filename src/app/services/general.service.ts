import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Coupon } from "src/models/coupon";
import { Customer } from "src/models/customer";
import { Company } from "src/models/company";
@Injectable({
  providedIn: "root"
})
export class GeneralService {
  private baseURL = `http://localhost:8080/${sessionStorage.usertype}/`;

  public purchased: boolean;

  public user: any;

  public coupons: Coupon[];
  public customers: Customer[];
  public companies: Company[];

  public customer: Customer;
  public company: Company;
  public coupon: Coupon;

  public couponsEmiter = new EventEmitter<Coupon[]>();
  public customersEmiter = new EventEmitter<Customer[]>();
  public companiesEmiter = new EventEmitter<Company[]>();

  constructor(private http: HttpClient) {}

  public getUserInfo(): Observable<any> {
    let user = sessionStorage.usertype;
    return this.http.get<any>(
      `http://localhost:8080/${user}/${sessionStorage.token}`
    );
  }

  public getPurchasedCoupon(): Observable<Coupon[]> {
    return this.http.get<any>(
      `http://localhost:8080/customer/coupon/purchased/${sessionStorage.token}`
    );
  }
  public addItem(item: any, type: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseURL}${type}/${sessionStorage.token}`,
      item
    );
  }

  public updateItem(item: any, type: string): Observable<any> {
    return this.http.put(
      `${this.baseURL}${type}/${sessionStorage.token}`,
      item
    );
  }
  public deleteItem(item: any, type: string): Observable<any> {
    return this.http.delete(
      `${this.baseURL}${type}/${item.id}/${sessionStorage.token}`
    );
  }

  public getItemArray(itemType: string, usertype): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:8080/${usertype}/${itemType}/${sessionStorage.token}`
    );
  }

  public purchaseCoupon(coup: Coupon): Observable<any> {
    return this.http.post(
      `http://localhost:8080/customer/coupon/${sessionStorage.token}`,
      coup
    );
  }
}

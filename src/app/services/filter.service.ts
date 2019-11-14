import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Coupon } from "src/models/coupon";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root"
})
export class FilterService {
  public filterType: string;
  public filter = new EventEmitter<Coupon[]>();
  private usertype: string;
  public BASEURL: string = "http://localhost:8080/";

  constructor(private http: HttpClient, private authService: LoginService) {
    // load user to sets local usertype variable
    this.authService.activeUser.subscribe(user => {
      if (!!user) this.usertype = user.usertype;
    });
  }

  getFilter = (filterInfo): Observable<Coupon[]> => {
    const { filterType, filterValue, filterTitle } = filterInfo;

    // if input value is all or it is empty load all coupons
    if (
      filterType == "all" ||
      filterValue == "all" ||
      filterValue == "" ||
      filterValue == null
    )
      return this.http.get<Coupon[]>(`${this.BASEURL}${this.usertype}/coupon`);
    else {
      // set URL strings
      let str1 = `${this.BASEURL}${this.usertype}/`,
        str2 = `coupon/${filterType}/${filterValue}`;

      // load data from DB depending on coupon type
      if (filterTitle == "Available Coupons")
        return this.http.get<Coupon[]>(`${str1}all/${str2}`);
      else return this.http.get<Coupon[]>(`${str1}${str2}`);
    }
  };
}

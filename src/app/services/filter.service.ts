import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Coupon } from "src/models/coupon";
import { GeneralService } from "./general.service";
import { LoginService } from "./login.service";
import { ActiveUser } from "src/models/active-user";

@Injectable({
  providedIn: "root"
})
export class FilterService {
  public filterType: string;
  public filter = new EventEmitter<Coupon[]>();
  private user: ActiveUser;
  public BASEURL: string = "http://localhost:8080/";

  constructor(
    private http: HttpClient,
    private genService: GeneralService,
    private authService: LoginService
  ) {
    this.authService.activeUser.subscribe(user => {
      this.user = user;
    });
  }

  getFilter = (filterInfo): Observable<Coupon[]> => {
    const { filterType, filterValue, filterTitle } = filterInfo;

    if (
      filterType == "all" ||
      filterValue == "all" ||
      filterValue == "" ||
      filterValue == null
    ) {
      return this.http.get<Coupon[]>(
        `${this.BASEURL}${this.user.usertype}/coupon/${this.user.token}`
      );
    } else {
      let str1 = `${this.BASEURL}${this.user.usertype}/`,
        str2 = `coupon/${filterType}/${filterValue}/${this.user.token}`;
      if (filterTitle == "Available Coupons")
        return this.http.get<Coupon[]>(`${str1}all/${str2}`);
      else return this.http.get<Coupon[]>(`${str1}${str2}`);
    }
  };
}

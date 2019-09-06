import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Coupon } from "src/models/coupon";

@Injectable({
  providedIn: "root"
})
export class FilterService {
  private baseURL = `http://localhost:8080`;

  public filter = new EventEmitter<Coupon[]>();

  constructor(private http: HttpClient) {}

  getFilter(filterInfo, usertype): Observable<Coupon[]> {
    const { filterType, filterValue } = filterInfo;
    if (filterType == "all" || filterValue == "all") {
      return this.http.get<Coupon[]>(
        `${this.baseURL}/${usertype}/coupon/${sessionStorage.token}`
      );
    } else
      return this.http.get<Coupon[]>(
        `${this.baseURL}/${usertype}/coupon/${filterType}/${filterValue}/${sessionStorage.token}`
      );
  }
}

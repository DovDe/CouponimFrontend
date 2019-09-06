import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  public loggedIn: boolean;
  public usertype: string;
  public user: any;

  constructor(private http: HttpClient) {}

  public login(l): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/login?email=${l.email}&password=${l.password}&type=${l.usertype}`,
      {}
    );
  }

  public logout(token): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/logout/${token}`, {});
  }
}

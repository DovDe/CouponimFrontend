// import { Injectable } from "@angular/core";
// import {
//   Resolve,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot
// } from "@angular/router";
// import { Observable } from "rxjs";
// import { Company } from "src/models/company";
// import { Customer } from "src/models/customer";
// import { Coupon } from "src/models/coupon";
// import { GeneralService } from './general.service';

// interface ServerResolver {
//   resolvedItem: () =>
//     | Observable<Company[]>
//     | Observable<Customer[]>
//     | Observable<Coupon[]>;
// }
// @Injectable({
//   providedIn: "root"
// })
// export class ResolverService implements Resolve<ServerResolver> {

//   constructor(private genService : GeneralService) {}
//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<ServerResolver> {
//     return this.genService.getItemArray
//   }
// }

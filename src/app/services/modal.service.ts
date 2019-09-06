import { Injectable } from "@angular/core";
import { ViewCouponComponent } from "../components/coupons/view-coupon/view-coupon.component";
import { AddCouponComponent } from "../components/coupons/add-coupon/add-coupon.component";
import { ViewCustomerComponent } from "../components/customers/view-customer/view-customer.component";
import { AddCustomerComponent } from "../components/customers/add-customer/add-customer.component";
import { ViewCompanyComponent } from "../components/companies/view-company/view-company.component";
import { AddCompanyComponent } from "../components/companies/add-company/add-company.component";
import { EditCustomerComponent } from "../components/customers/edit-customer/edit-customer.component";
import { EditCompanyComponent } from "../components/companies/edit-company/edit-company.component";
import { EditCouponComponent } from "../components/coupons/edit-coupon/edit-coupon.component";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  compMap = {
    viewcoupon: ViewCouponComponent,
    addcoupon: AddCouponComponent,
    editcoupon: EditCouponComponent,
    viewcustomer: ViewCustomerComponent,
    addcustomer: AddCustomerComponent,
    editcustomer: EditCustomerComponent,
    viewcompany: ViewCompanyComponent,
    addcompany: AddCompanyComponent,
    editcompany: EditCompanyComponent
  };
  constructor() {}

  getComp(parentType, viewType) {
    return this.compMap[`${viewType}${parentType}`];
  }
}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { CustomerDashboardComponent } from "./components/customer-dashboard/customer-dashboard.component";
import { CompanyDashboardComponent } from "./components/company-dashboard/company-dashboard.component";
import { CouponsComponent } from "./components/coupons/coupons.component";
import { NavComponent } from "./components/nav/nav.component";
import { LandingComponent } from "./components/landing/landing.component";
import { IntroComponent } from "./components/intro/intro.component";
import { FiltersComponent } from "./components/filters/filters.component";
import { AlertComponent } from "./components/alert/alert.component";
import { ModalComponent } from "./components/modal/modal.component";
import { PlaceholderDirective } from "./directives/placeholder.directive";
import { ViewCouponComponent } from "./components/coupons/view-coupon/view-coupon.component";
import { AddCouponComponent } from "./components/coupons/add-coupon/add-coupon.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { ViewCustomerComponent } from "./components/customers/view-customer/view-customer.component";
import { AddCustomerComponent } from "./components/customers/add-customer/add-customer.component";
import { CompaniesComponent } from "./components/companies/companies.component";
import { ViewCompanyComponent } from "./components/companies/view-company/view-company.component";
import { AddCompanyComponent } from "./components/companies/add-company/add-company.component";
import { PurchaseCouponComponent } from "./components/coupons/purchase-coupon/purchase-coupon.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ErrorComponent } from "./components/error/error.component";
import { EditCustomerComponent } from "./components/customers/edit-customer/edit-customer.component";
import { EditCompanyComponent } from "./components/companies/edit-company/edit-company.component";
import { EditCouponComponent } from "./components/coupons/edit-coupon/edit-coupon.component";

@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
    CompanyDashboardComponent,
    CouponsComponent,
    NavComponent,
    LandingComponent,
    IntroComponent,
    FiltersComponent,
    AlertComponent,
    ModalComponent,
    PlaceholderDirective,
    ViewCouponComponent,
    AddCouponComponent,
    CustomersComponent,
    ViewCustomerComponent,
    AddCustomerComponent,
    CompaniesComponent,
    ViewCompanyComponent,
    AddCompanyComponent,
    PurchaseCouponComponent,
    NotFoundComponent,
    ErrorComponent,
    EditCustomerComponent,
    EditCompanyComponent,
    EditCouponComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [LayoutComponent],
  entryComponents: [
    ModalComponent,
    ViewCouponComponent,
    AddCouponComponent,
    EditCouponComponent,
    ViewCustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    ViewCompanyComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    PurchaseCouponComponent
  ]
})
export class AppModule {}

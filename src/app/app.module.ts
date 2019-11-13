import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ErrorComponent } from "./components/error/error.component";
import { EditCustomerComponent } from "./components/customers/edit-customer/edit-customer.component";
import { EditCompanyComponent } from "./components/companies/edit-company/edit-company.component";
import { EditCouponComponent } from "./components/coupons/edit-coupon/edit-coupon.component";
import { LoadingSpinnerComponent } from "./components/shared/loading-spinner/loading-spinner.component";
import { MessagesComponent } from "./components/shared/messages/messages.component";
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { UserinfoCompanyComponent } from "./components/userinfo-company/userinfo-company.component";
import { UserinfoCustomerComponent } from "./components/userinfo-customer/userinfo-customer.component";
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
    NotFoundComponent,
    ErrorComponent,
    EditCustomerComponent,
    EditCompanyComponent,
    EditCouponComponent,
    LoadingSpinnerComponent,
    MessagesComponent,
    UserinfoCompanyComponent,
    UserinfoCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
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
    UserinfoCompanyComponent,
    UserinfoCustomerComponent
  ]
})
export class AppModule {}

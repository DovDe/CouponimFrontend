import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyDashboardComponent } from "./components/company-dashboard/company-dashboard.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { CustomerDashboardComponent } from "./components/customer-dashboard/customer-dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { LandingComponent } from "./components/landing/landing.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: "company",
    canActivate: [AuthGuardService],
    component: CompanyDashboardComponent
  },
  {
    path: "administrator",
    canActivate: [AuthGuardService],
    component: AdminDashboardComponent
  },
  {
    path: "customer",
    canActivate: [AuthGuardService],
    component: CustomerDashboardComponent
  },
  { path: "home", component: LandingComponent },
  { path: "404", component: NotFoundComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

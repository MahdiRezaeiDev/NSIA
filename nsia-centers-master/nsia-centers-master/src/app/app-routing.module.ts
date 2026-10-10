import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { IndividualformdetailsComponent } from './individualformdetails/individualformdetails.component';
import { ApplicationdetailsComponent } from './applicationdetails/applicationdetails.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReportComponent } from './report/report.component';
import { IndividualformsReportComponent } from './individualforms-report/individualforms-report.component';
import { AuditReportComponent } from './audit-report/audit-report.component';
import { FamilyformsReportComponent } from './familyforms-report/familyforms-report.component';
import { IndividualformsGeneralReportComponent } from './individualforms-general-report/individualforms-general-report.component';

const routes: Routes = [
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"changePassword",
    component:ChangePasswordComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"view-application-details/:application_type/:reference_no",
    component:ApplicationdetailsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"admin-dashboard",
    component:AdminDashboardComponent
  },
  {
    path:"reports",
    component:ReportComponent
  },
  {
    path:"individualforms-report",
    component:IndividualformsReportComponent
  },
  {
    path:"audit-report",
    component:AuditReportComponent
  },
  {
    path:"individualforms-general-report",
    component:IndividualformsGeneralReportComponent
  },
  {
    path:"familyforms-report",
    component:FamilyformsReportComponent
  },
  
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"",
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

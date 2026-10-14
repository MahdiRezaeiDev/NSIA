import { BrowserModule } from '@angular/platform-browser';
import { PageSkeletonComponent } from './page-skeleton/page-skeleton.component';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserDropDownComponent } from './user-drop-down/user-drop-down.component';
import { Api } from './Api';
import { LoginComponent } from './login/login.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxSpinnerModule } from "ngx-spinner";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ImagePipe } from './image.pipe';
import { AppointmentCalenderComponent } from './appointment-calender/appointment-calender.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { IndividualformdetailsComponent } from './individualformdetails/individualformdetails.component';
import { ApplicantinfoComponent } from './applicantinfo/applicantinfo.component';
import { ApplicationdetailsComponent } from './applicationdetails/applicationdetails.component';
import { ImageViewerModule } from 'ng2-image-viewer';
import {MatIconModule} from '@angular/material/icon';
import { NoteComponent } from './note/note.component';
import { ProcessreportComponent } from './processreport/processreport.component';
import {EchoConfig, NgxLaravelEchoModule} from 'ngx-laravel-echo';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { environment} from '../environments/environment';
import { ReportComponent } from './report/report.component';
import { IndividualformsReportComponent } from './individualforms-report/individualforms-report.component';
import { FamilyformsReportComponent } from './familyforms-report/familyforms-report.component';
import { VerificationModalComponent } from './verification-modal/verification-modal.component';
import { IndividualformsGeneralReportComponent } from './individualforms-general-report/individualforms-general-report.component';
import { AuditReportComponent } from './audit-report/audit-report.component';
import { Select2Module } from 'ng2-select2';
import { ShowImageModalComponent } from './show-image-modal/show-image-modal.component';
export const echoConfig: EchoConfig = {
  userModel: 'users',
  notificationNamespace: 'App\\',
  options: {
      broadcaster: 'socket.io',
      key: '',
      wsHost: environment.url,
      authEndpoint: environment.url+'/broadcasting/auth',
      host: environment.url+':3001',
      wsPort: 3001,
      disableStats: true,
      namespace: '',
      auth: {
        headers: {
            Authorization: '',
        },
    },
  }
};

@NgModule({
  declarations: [
    PageSkeletonComponent,
    AppComponent,
    UserDropDownComponent,
    LoginComponent,
    ErrorMessageComponent,
    DashboardComponent ,
    ErrorMessageComponent,
    ChangePasswordComponent,
    ImagePipe,
    AppointmentCalenderComponent,
    SearchbarComponent,
    IndividualformdetailsComponent,
    ApplicantinfoComponent,
    ApplicationdetailsComponent,
    NoteComponent,
    ProcessreportComponent,
    AdminDashboardComponent,
    ReportComponent,
    IndividualformsReportComponent,
    AuditReportComponent,
    FamilyformsReportComponent,
    VerificationModalComponent,
    ShowImageModalComponent,
    IndividualformsGeneralReportComponent,
    ShowImageModalComponent
  ],
  entryComponents:[ErrorMessageComponent,VerificationModalComponent,ShowImageModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, 
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    Select2Module,
    //HttpClientXsrfModule.disable(),
    HttpClientModule,
    ImageViewerModule,
    
    NgxLaravelEchoModule.forRoot(echoConfig),
    MatIconModule
  ],
  providers: [Api,AuthGuard,ImagePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

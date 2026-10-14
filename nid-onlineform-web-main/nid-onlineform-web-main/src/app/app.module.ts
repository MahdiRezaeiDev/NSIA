import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndividualformComponent } from './individualform/individualform.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Api } from './services/Api';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule,  TranslateLoader} from '@ngx-translate/core';
import { NavbarComponent } from './navbar/navbar.component';
import { TrackingComponent } from './tracking/tracking.component';
import { BirthRegistrationComponent } from './birth-registration/birth-registration.component';
import { DatabaseCorrectionComponent } from './database-correction/database-correction.component';
import { IdCorrectionComponent } from './id-correction/id-correction.component';
import { IdCopyComponent } from './id-copy/id-copy.component';
import { Select2Module } from 'ng2-select2';
import { LanguageSelectionComponent } from './language-selection/language-selection.component';
import {NgxMaskModule,IConfig} from 'ngx-mask';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module ,RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { IndividualformConfirmationComponent } from './individualform-confirmation/individualform-confirmation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormSavedConfirmationComponent } from './form-saved-confirmation/form-saved-confirmation.component';
import { FileUploadModule } from 'ng2-file-upload';
import { LoadingComponent } from './loading/loading.component';
import { NoticeComponent } from './notice/notice.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    IndividualformComponent,
    HomepageComponent,
 
    NavbarComponent,
 
    TrackingComponent,
 
    BirthRegistrationComponent,
 
    DatabaseCorrectionComponent,
 
    IdCorrectionComponent,

    IdCopyComponent,

    LanguageSelectionComponent,

    IndividualformConfirmationComponent,

    FormSavedConfirmationComponent,

    NoticeComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    HttpClientModule,
    NgbModule,
    Select2Module,
    FileUploadModule,
    NgxMaskModule.forRoot({}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule
  ],

  providers: [
    Api,
    NgbModalConfig, NgbModal,
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcMpcMUAAAAANmQAKUElaHOg3VvvwJNrbbD35BU' },
    { provide: RECAPTCHA_LANGUAGE, useValue: 'fa' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}

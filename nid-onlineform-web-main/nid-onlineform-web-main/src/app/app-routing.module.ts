import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndividualformComponent } from "./individualform/individualform.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { TrackingComponent } from "./tracking/tracking.component";
import { BirthRegistrationComponent } from "./birth-registration/birth-registration.component";
import {DatabaseCorrectionComponent } from "./database-correction/database-correction.component";
import {IdCorrectionComponent } from "./id-correction/id-correction.component";
import {IdCopyComponent } from "./id-copy/id-copy.component";
import { LanguageSelectionComponent} from './language-selection/language-selection.component';
import { IndividualformConfirmationComponent} from './individualform-confirmation/individualform-confirmation.component';
import { FormSavedConfirmationComponent } from './form-saved-confirmation/form-saved-confirmation.component';
import { NoticeComponent } from './notice/notice.component';
const routes: Routes = [
  { path: 'home', component: HomepageComponent},
  { path: 'individual-form', component: IndividualformComponent},
  { path: 'birth-registration', component: BirthRegistrationComponent},
  { path: 'database-correction-form', component: DatabaseCorrectionComponent},
  { path: 'id-correction-form', component: IdCorrectionComponent},
  { path: 'id-copy', component: IdCopyComponent},
  { path: 'tracking', component: TrackingComponent},
  { path: 'individual-form-confirmation', component: IndividualformConfirmationComponent},
  {path:'savedformconfirmation',component:FormSavedConfirmationComponent},
  { path: '', component: LanguageSelectionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

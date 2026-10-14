import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from "@angular/router";
import { Api } from '../services/Api';
import {  ReCaptchaV3Service} from 'ng-recaptcha';
import { RequestState } from '../shared/RequestState';
import { switchMap, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  public loading = new RequestState();
  public searchFailed = false;
  ngOnDestroy() { this.loading.destroy(); }

  constructor(public api:Api,private router:Router,private captcha:ReCaptchaV3Service) {

  }
  public formName="";
  public reference_no="";
  public applicationNotFound=false;
  ngOnInit() {
  }
  toggleForm(formName){

    if(this.formName == formName){
      this.formName ="";
    }else{
      this.formName = formName;
    } 
   
  }

  findApplication() {
    if (this.loading.busy('search')) { return; }
    this.applicationNotFound=false;
    this.searchFailed = false;
    this.loading.track('search', this.captcha.execute('find_application').pipe(
      timeout(30000),
      switchMap(token => this.api.process('/findApplication', {reference_no:this.reference_no,token:token}))
    )).subscribe(res => {
      this.router.navigateByUrl('/individual-form', {state:{foundApplication:res}});
    }, error => {
      this.applicationNotFound = error.status === 404;
      this.searchFailed = !this.applicationNotFound;
    });

  }


}

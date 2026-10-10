import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Api } from '../services/Api';
import {  ReCaptchaV3Service} from 'ng-recaptcha';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public api:Api,private router:Router,private captcha:ReCaptchaV3Service,private spinner: NgxSpinnerService) { 

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
    
    this.applicationNotFound=false;
    this.spinner.show();
    this.captcha.execute('find_application').subscribe((token)=>{
      this.api.process("/findApplication", {reference_no:this.reference_no,token:token}).subscribe(res => {
        this.router.navigateByUrl("/individual-form",{state:{foundApplication:res}});
        this.spinner.hide();
      }, error => {
        this.applicationNotFound = true;
        this.spinner.hide();
      });
    });

  }


}

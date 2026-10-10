import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {Api} from '../services/Api';
import {  ReCaptchaV3Service} from 'ng-recaptcha';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  public tracking_no:string="";
  public contact_no:string="";
  public printLink:any="";
  public events:any=[];
  @Input() formName:string="";
  constructor(private route:ActivatedRoute,private api:Api,private captcha:ReCaptchaV3Service,private spinner: NgxSpinnerService) {

   }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      if(params.hasOwnProperty('tracking_no')){
        alert('GETTING Tracking events');
      }
    })
  }


  track(){
    this.spinner.show();
    this.captcha.execute('tracking').subscribe((token)=>{
  
      this.api.process("/track",{token:token,tracking_no:this.tracking_no,contact_no:this.contact_no}).subscribe(res=>{
        this.events = res;
        this.spinner.hide();
      },error=>{
        this.spinner.hide();
        console.log('ERROR',error);
        alert(error.error.message);
      });
    },()=>{
        this.spinner.hide();
    });
      
  }

}

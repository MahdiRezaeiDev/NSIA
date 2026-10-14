import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, timeout } from 'rxjs/operators';
import {Api} from '../services/Api';
import {  ReCaptchaV3Service} from 'ng-recaptcha';
import { RequestState } from '../shared/RequestState';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, OnDestroy {
  public loading = new RequestState();
  public errorMessage = '';
  ngOnDestroy() { this.loading.destroy(); }

  public tracking_no:string="";
  public contact_no:string="";
  public printLink:any="";
  public events:any=[];
  @Input() formName:string="";
  constructor(private route:ActivatedRoute,private api:Api,private captcha:ReCaptchaV3Service) {

   }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      if(params.hasOwnProperty('tracking_no')){
        alert('GETTING Tracking events');
      }
    })
  }


  track(){
    if (this.loading.busy('tracking')) { return; }
    this.errorMessage = '';
    this.events = [];
    this.loading.track('tracking', this.captcha.execute('tracking').pipe(
      timeout(30000),
      switchMap(token => this.api.process('/track', {token:token,tracking_no:this.tracking_no,contact_no:this.contact_no}))
    )).subscribe(res => {
      this.events = res;
    }, error => {
      this.errorMessage = (error.error && error.error.message) || 'loading.failed';
    });
      
  }

}

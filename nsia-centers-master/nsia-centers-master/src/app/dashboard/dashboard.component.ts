import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Api } from '../Api';
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private routeSubscription: any;
  private readonly applicationChannel = environment.applicationsChannel;
  public family_form_reference_no ="";
  private httpRequest:any;
  public showDatePicker=false;
  constructor(public api:Api,private spinner:NgxSpinnerService,private route: ActivatedRoute,private router:Router, private zone: NgZone) {
    this.setListeners();
    this.routeSubscription = this.route.queryParams.subscribe(params=>{
      let center_id:any= +params['center_id'] || false;
      let status:any =false;
     
      if(params && 'status' in params){
       status=params['status'];
      }
      if(status =='undefined'){
        status=false;
      }
      if(status){
        this.api.status = status;
      }
      
      if(!center_id){
        if(sessionStorage.getItem('center_id')!=null){
            center_id = sessionStorage.getItem('center_id');
        }
      }
      if(center_id){
        this.onCenterSelected(center_id);
      }

      if(!this.api.selectedDate){
        if(sessionStorage.getItem('selectedDate')!=null){
          this.api.selectedDate= JSON.parse(sessionStorage.getItem('selectedDate'));
        }
      
      }
      if(this.api.status == false){
        if(sessionStorage.getItem('status')!=null){
          this.api.status= sessionStorage.getItem('status');
        }
      
      }
     
    });
  }
 
  ngOnInit(){
    if(this.api.isAudit()){
        this.router.navigate(["/audit-report"]);
    }
    
    this.api.getApplications();
  }
  ngAfterContentInit(){
    this.api.applications=[];
  }

  onDateSelected(d){

    if (d) { sessionStorage.setItem('selectedDate', JSON.stringify(d)); }
    else { sessionStorage.removeItem('selectedDate'); }
    this.api.selectedDate = d;
    this.api.searchQuery=false;
    this.api.getApplications();
  
  }
  onSearch(query){
    this.api.searchQuery=query;
    this.api.getApplications();
   
  }

  onCenterSelected(id){

   sessionStorage.setItem('center_id',id);
   this.api.center_id = id;
   this.api.getApplications();
 
  }
  onStatusSelected(status){
    this.api.status= status;

    sessionStorage.setItem('status',this.api.status)
    this.api.getApplications();
    
  }
  private setListeners(){
    const channel = this.api.echoService.echo.channel(this.applicationChannel);
    channel.listen('.opened', res => this.updateOpenedState(res, true));
    channel.listen('.closed', res => this.updateOpenedState(res, false));
  }

  private updateOpenedState(res: any, opened: boolean) {
    if (!res || !res.application) { return; }
    const event = res.application;
    this.zone.run(() => {
      for (const application of this.api.applications) {
        if (event.family_form_reference_no != application.family_form_reference_no) { continue; }
        if (!opened && application.opened_by_user_id && event.user_id
            && application.opened_by_user_id != event.user_id) { continue; }
        application.opened = opened;
        application.opened_by = opened ? event.username : '';
        application.opened_by_user_id = opened ? event.user_id : 0;
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) { this.routeSubscription.unsubscribe(); }
    this.api.echoService.echo.leave(this.applicationChannel);
    if (this.api.httpRequest) { this.api.httpRequest.unsubscribe(); }
    this.api.processing = false;
  }

  moveApplicationToVip(){
    if(this.family_form_reference_no == ''){
      alert('لطفا شماره فارم فامیلی را تایپ کنید!');
      return;
    }
    this.spinner.show();
    this.api.process('/moveToVipCenter?family_form_reference_no='+this.family_form_reference_no,{},'GET').subscribe((res:any)=>{
      this.spinner.hide(); 
      if(res.status == 'ok'){
          alert('فارم انتقال داده شد!');
          this.family_form_reference_no="";
        }
    },(error)=>{
      this.spinner.hide();
        alert('فارم پیدا نشد یا یک مشکل رخ داد! لطفا دوباره کوشش نمایید!');
    });
  }

}

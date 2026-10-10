import { Component, OnInit } from '@angular/core';
import { Api } from '../Api';
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public applications:Array<any>=[];
  public socket:any;
  public family_form_reference_no ="";
  private httpRequest:any;
  public showDatePicker=false;
  constructor(public api:Api,private spinner:NgxSpinnerService,private route: ActivatedRoute,private router:Router) {
    this.setListeners();
    this.route.queryParams.subscribe(params=>{
      let center_id:any= +params['center_id'] || false;
      let status:any =false;
     
      if(params && 'status' in params){
       status=params['status'];
       console.log('STATUS',status);
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

    sessionStorage.setItem('selectedDate',JSON.stringify(d));
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
    this.api.echoService.echo.channel('nsia_database_private-applications').listen('.opened',res=>{
      
      for(let a of this.applications){
        if( res.application.family_form_reference_no == a.family_form_reference_no ){
            a.opened=true;
            a.opened_by= res.application.username;
            a.opened_by_user_id= res.application.user_id;
        }
      }
  });
  this.api.echoService.echo.channel('nsia_database_private-applications').listen('.closed',res=>{
  
      for(let a of this.applications){
        if( res.application.family_form_reference_no == a.family_form_reference_no ){
            a.opened=false;
            a.opened_by='';
            a.opened_by_user_id= 0;
        }
      }
  });
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

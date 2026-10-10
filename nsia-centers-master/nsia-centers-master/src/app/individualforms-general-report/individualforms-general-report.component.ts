import { Component, OnInit } from '@angular/core';
import { Api } from '../Api';
import * as moment from 'jalali-moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DariCalender } from '../shared/DariCalender';
@Component({
  selector: 'app-individualforms-general-report',
  templateUrl: './individualforms-general-report.component.html',
  styleUrls: ['./individualforms-general-report.component.css'],
  providers:[
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: DariCalender}
  ]
})
export class IndividualformsGeneralReportComponent implements OnInit {
  public center_id ="false";
  public status    = 1;
  public user_id:any= 0;
  public users:any=[];
  statusList:any=[];
  public selectedStatus:any="";
  public start_date:any;
  public end_date:any;
  public events:Array<{
    date:string,
    reference_no:string,
    description:string,
    user_id:number,
    username:string
  }>=[];
  constructor(public api:Api,public spinner:NgxSpinnerService) { 
    this.api.selectedDate=false;
  }

  ngOnInit() {
    this.api.applications=[];
    this.getCenterUsers();
    this.getStatusList();
    if(this.status == 1){
      this.selectedStatus= {step: 1, status: 1, description: "چک شد", color: "rgb(5,245,20)"};
    }
    let today = moment().locale('fa');

this.start_date= {
  "day":+today.format('DD'),
  "month":+today.format('MM'),
  "year":+today.format('YYYY'),
};
//today.add(0,'day');
this.end_date= {
  "day":+today.format('DD'),
  "month":+today.format('MM'),
  "year":+today.format('YYYY'),
};
  }


  onCenterSelected(id){
    this.api.center_id = id;
    if(this.api.appointment_start_date == undefined || this.api.appointment_end_date==undefined){
      return false;
    }
    this.api.getApplications(this.api.appointment_start_date,this.api.appointment_end_date,'general'); 
  }

  getEvents(){
    this.spinner.show();
     let start = this.start_date.year+"-"+this.start_date.month+"-"+this.start_date.day;
     let end = this.end_date.year+"-"+this.end_date.month+"-"+this.end_date.day;
      this.api.process("/getEvents",{
        start:start,
        end:end,
        status:this.status,
        user_id:this.user_id
      },'GET').subscribe((events:any)=>{
        this.events = events;
        this.spinner.hide();
      },()=>{
        this.spinner.hide();
        alert('لطفا دوباره کوشش کنید');
      });
  }

  getCenterUsers(){
      this.api.process("/getCenterUsers",{},"GET").subscribe((users:any)=>{
          this.users = users;
      },()=>{
        alert('یک مشکل رخ داد لطفا دوباره کوشش نمایید');
      });
  }

  selectUser(event){
    console.log('event',event);
      this.user_id = event.value;

  }
  private getStatusList(){
    this.api.process("/getStatusList",{}).subscribe((data:any)=>{
       this.statusList = data.filter((d)=>{
        return d.status!=0;
       });
      
    })
  }

  public selectStatus(status){
    this.status = status.status
    this.selectedStatus=status;
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Api } from '../Api';
import * as moment from 'jalali-moment';
import { Subject } from 'rxjs';
import { takeUntil, timeout, finalize } from 'rxjs/operators';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { DariCalender } from '../shared/DariCalender';
@Component({
 selector:'app-individualforms-general-report',
 templateUrl:'./individualforms-general-report.component.html',
 styleUrls:['./individualforms-general-report.component.css'],
 providers:[{provide:NgbCalendar,useClass:NgbCalendarPersian},{provide:NgbDatepickerI18n,useClass:DariCalender}]
})
export class IndividualformsGeneralReportComponent implements OnInit, OnDestroy {
 public status=1; public user_id:any=0; public users:any=[]; public statusList:any=[];
 public selectedStatus:any={status:1,description:'چک شد'};
 public start_date:any; public end_date:any; public events:any=[];
 public loading=false; public searched=false; public errorMessage=''; public lookupError='';
 private destroyed = new Subject<void>();
 constructor(public api:Api) {}
 ngOnInit() {
  const today=moment().locale('fa');
  this.start_date={day:+today.format('DD'),month:+today.format('MM'),year:+today.format('YYYY')};
  this.end_date=Object.assign({},this.start_date);
  this.api.exportError='';
  this.api.process('/getCenterUsers',{},'GET').pipe(timeout(30000),takeUntil(this.destroyed)).subscribe(
   (users:any)=>this.users=users,()=>this.lookupError='دریافت فهرست کارمندان انجام نشد. صفحه را تازه کنید.');
  this.api.process('/getStatusList',{}).pipe(timeout(30000),takeUntil(this.destroyed)).subscribe(
   (data:any)=>this.statusList=data.filter(d=>d.status!=0),()=>this.lookupError='دریافت مراحل پروسه انجام نشد. صفحه را تازه کنید.');
 }
 getEvents() {
  if(this.loading){return;}
  this.errorMessage='';
  if(!this.start_date || !this.end_date || !this.start_date.year || !this.end_date.year){
   this.errorMessage='تاریخ شروع و ختم را به شکل درست انتخاب کنید.';return;
  }
  const key=d=>d.year*10000+d.month*100+d.day;
  if(key(this.start_date)>key(this.end_date)){this.errorMessage='تاریخ ختم نباید پیش از تاریخ شروع باشد.';return;}
  this.loading=true; this.searched=true; this.api.exportError='';
  this.api.process('/getEvents',{start:this.api.formatDate(this.start_date),end:this.api.formatDate(this.end_date),status:this.status,user_id:this.user_id},'GET')
   .pipe(timeout(30000),takeUntil(this.destroyed),finalize(()=>this.loading=false)).subscribe(
   (events:any)=>this.events=events,()=>this.errorMessage='دریافت راپور انجام نشد. لطفاً دوباره کوشش کنید.');
 }
 selectUser(event){if(event){this.user_id=event.value;}}
 selectStatus(status){this.status=status.status;this.selectedStatus=status;}
 ngOnDestroy(){this.destroyed.next();this.destroyed.complete();}
}

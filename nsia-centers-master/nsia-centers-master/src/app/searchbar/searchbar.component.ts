import { Component, OnInit, Output,EventEmitter, Input, Injectable, ViewChild, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Api } from '../Api';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DariCalender } from '../shared/DariCalender';
import { fromGregorian } from '@ng-bootstrap/ng-bootstrap/datepicker/jalali/jalali';
import * as moment from 'jalali-moment';
import { Subject } from 'rxjs';
import { takeUntil, timeout } from 'rxjs/operators';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  providers:[
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: DariCalender}
  ]
})

export class SearchbarComponent implements OnInit, OnDestroy {
  public searchTerm:string  ="";
  public dateError = '';
  public lookupError = '';
  private destroyed = new Subject<void>();
  public centers:any=[];

  @Input() center_id:any=false;
  @Input() status=false;
  @Input() showStatusButton=true;
  @Input() reportType:string='individual';
  @Input() showDatePicker=false;
  statusList:any=[];
  public selectedCenter:any     = {id:0,name:"تمام مراکز"};
  public selectedStatus    =  {description:'پروسه',status:false};
  @Output() searched        = new EventEmitter<string>();
  @Output() centerSelected  = new EventEmitter<string>();
  @Output() statusSelected  = new EventEmitter<string>();
  @ViewChild('startDate',{static:false}) startDate;
  public start_date:any="abc";
  public end_date:any="abc";
  constructor(public api:Api) { 
      let today = moment().locale('fa');
          today.subtract(5,'day');
    
      this.start_date= {
        "day":+today.format('DD'),
        "month":+today.format('MM'),
        "year":+today.format('YYYY'),
      };
      today.add(5,'day');
      this.end_date= {
        "day":+today.format('DD'),
        "month":+today.format('MM'),
        "year":+today.format('YYYY'),
      };
    
     
  }

  ngOnDestroy() { this.destroyed.next(); this.destroyed.complete(); }

  ngOnInit() {
    this.lookupError = '';
    if(this.api.isAdmin()){
      this.getCenters();
    }
    if(this.api.isAudit()){
      this.getCenters();
      return true;
    }
    this.getStatusList();
  }

  search(){
    this.searched.emit(this.searchTerm);
  }

  searchDates() {
    this.dateError = '';
    if (!this.start_date || !this.end_date || !this.start_date.year || !this.end_date.year) {
      this.dateError = 'تاریخ شروع و ختم را به شکل درست انتخاب کنید.';
      return;
    }
    const key = d => d.year * 10000 + d.month * 100 + d.day;
    if (key(this.start_date) > key(this.end_date)) {
      this.dateError = 'تاریخ ختم نباید پیش از تاریخ شروع باشد.';
      return;
    }
    this.api.getApplications(this.start_date, this.end_date, this.reportType);
  }

  getCenters(){
    this.lookupError = '';
    this.api.process("/getCenters?type=name",{},'GET').pipe(timeout(30000),takeUntil(this.destroyed)).subscribe( (res:any)=>{
        this.centers    = res.centers;
        this.centers.unshift({'text':'تمام مراکز',id:'',name:'تمام مراکز'});
        this.centers    = this.centers.map((c)=>{
          c['text'] = c.name;
          return c;
        });
        //this.centers.unshift({id:0,name:"تمام مراکز",text:"تمام مراکز"});
       
        this.statusList = res.statusList;
        //this.statusList.unshift({description:"تمام فورم ها",status:false});
        this.autoSelectCenter();
        this.autoStatusCenter();
    }, () => this.lookupError = 'دریافت فهرست مراکز انجام نشد. لطفاً دوباره کوشش کنید.');
  }
  filterByCenter(center){
    // Select2 can emit while its initial options are being populated.
    if (!center || !center.data || !center.data.length) { return; }
    center = center.data[0];
    this.selectedCenter = center;
    if (String(center.id) === String(this.center_id || '')) { return; }
    this.centerSelected.emit(center.id);
    
  }
  filterByStatus(status){
    this.selectedStatus = status;
    this.statusSelected.emit(status.status);
  }

  private autoSelectCenter(){

    if(this.center_id!==false){

      this.selectedCenter = this.centers.find(c=>c.id == this.center_id);
    }
    if(this.selectedCenter == undefined){
      this.selectedCenter = {id:0,name:"تمام مراکز"};
    }

  }
  private autoStatusCenter(){

    if(this.status!==false){
      this.selectedStatus = this.statusList.find(s=>s.status == this.status);
      
    }
  }
  
  private getStatusList(){
    this.api.process("/getStatusList",{}).pipe(timeout(30000),takeUntil(this.destroyed)).subscribe(data=>{
       this.statusList = data;
       this.autoStatusCenter();
    }, () => this.lookupError = 'دریافت مراحل پروسه انجام نشد. لطفاً دوباره کوشش کنید.')
  }
}


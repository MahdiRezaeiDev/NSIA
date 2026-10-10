import { Component, OnInit, Output,EventEmitter, Input, Injectable, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Api } from '../Api';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DariCalender } from '../shared/DariCalender';
import { fromGregorian } from '@ng-bootstrap/ng-bootstrap/datepicker/jalali/jalali';
import * as moment from 'jalali-moment';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
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

export class SearchbarComponent implements OnInit,AfterViewInit {
  public searchTerm:string  ="";
  public centers:any=[];

  @Input() center_id=false;
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

  ngOnInit() {
    if(this.api.isAdmin()){
      this.getCenters();
    }
    if(this.api.isAudit()){
      this.getCenters();
      return true;
    }
    this.getStatusList();
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      if(this.showDatePicker){
        this.startDate._elRef.value=Date();
      }
      
    },2000);
  
   // this.startDate.nativeElement.value = 'abc' ; 
  }


  search(){
    this.searched.emit(this.searchTerm);
  }

  getCenters(){
    this.api.process("/getCenters?type=name",{},'GET').subscribe( (res:any)=>{
        this.centers    = res.centers;
        this.centers.unshift({'text':'',id:'',name:''});
        this.centers    = this.centers.map((c)=>{
          c['text'] = c.name;
          return c;
        });
        //this.centers.unshift({id:0,name:"تمام مراکز",text:"تمام مراکز"});
       
        this.statusList = res.statusList;
        //this.statusList.unshift({description:"تمام فورم ها",status:false});
        this.autoSelectCenter();
        this.autoStatusCenter();
    });
  }
  filterByCenter(center){

    center = center.data[0];
    this.selectedCenter = center;
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
    this.api.process("/getStatusList",{}).subscribe(data=>{
       this.statusList = data;
    })
  }
}

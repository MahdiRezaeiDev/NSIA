import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Api } from '../Api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-appointment-calender',
  templateUrl: './appointment-calender.component.html',
  styleUrls: ['./appointment-calender.component.css']
})
export class AppointmentCalenderComponent implements OnInit {
  public dates:any=[];
  private _center_id;
  private _status=false;
  private processing=false;
  public today;
  private httpClient:any;
  @Input() selectedDate:any=false;
  @Input()
  set center_id(val:any){
    this._center_id = val;
    this.getDates();
  }
  get center_id():any{
    return this._center_id;
  }
 @Input()
  set status(val:any){
    this._status = val;
    this.getDates();
  }
  get status():any{
      return this._status;
  }

  @Output() dateSelected = new EventEmitter<any>();
  constructor(private api:Api,private router:Router) { }



  ngOnInit() {
   // this.getDates();
  }
  getDates(){
    let params = {};
    if(this.center_id == "false"){
      this.center_id = false;
    }
    if(this.center_id){
      params = {center_id:this.center_id};
    }
    if(this.status == undefined){
        this.status=false;
    }
    if(this.status!==false){
      params['status'] = this._status;
    }
    if(this.processing){
      this.httpClient.unsubscribe();
    }
    this.processing=true;

    this.httpClient=this.api.process("/appointmentDates",params,"GET").subscribe((res:any)=>{
      this.dates = res.list;
    
      this.today = res.today;
      this.processing=false;
      if(sessionStorage.getItem('selectedDate') == null){
        this.selectFirstDate();
      }else{
          this.selectDate( JSON.parse(sessionStorage.getItem('selectedDate')));
      }

    },(error)=>{
      this.processing=false;
        if(error.status == 401 ){
            this.router.navigateByUrl("/login");
        }
    });
  }

  selectFirstDate(){
    this.selectedDate=false;
    
    if(!this.dates || this.dates.length == 0){
      return false;
    }
    for(let y of this.dates){
        for(let month of y.months){
            if(this.selectedDate== false){
              if(month.value == this.today.month){
                  let day = month.days.find(d=>d.d == this.today.day);
                  this.selectDate(day);
                  return true;
              }
          
            }
         
            
        }
    }
  }

  selectDate(d){
    this.selectedDate = d;
    this.openMonth(d.y,d.m);
    this.dateSelected.emit(d);
  }
  openMonth(year,monthValue){
  
    for(let y of this.dates){
      for(let month of y.months){
        if(y.year == year && month.value == monthValue){
            month.open = true;
            this.openYear(y.year);
        }else{
          month.open=false;
        }
      }
    }
  }
  openYear(year){
    for(let y of this.dates){
      if(y.year == year){
        y.open = true;
      }else{
        y.open = false;
      }
    }
  }

 

}

import { Component, OnInit } from '@angular/core';
import { Api } from '../Api';


@Component({
  selector: 'app-individualforms-report',
  templateUrl: './individualforms-report.component.html',
  styleUrls: ['./individualforms-report.component.css']
})
export class IndividualformsReportComponent implements OnInit {
  public center_id="false";
  public status   = 0;
  constructor(public api:Api) { 
    this.api.selectedDate=false;
  }
  ngOnInit() {
    this.api.applications=[];
  }
  onCenterSelected(id){
    this.api.center_id = id;
    if(this.api.appointment_start_date == undefined || this.api.appointment_end_date==undefined){
      return false;
    }
    this.api.getApplications(this.api.appointment_start_date,this.api.appointment_end_date); 
  }

  onStatusSelected(status){
    this.api.status= status;
    if(this.api.appointment_start_date == undefined || this.api.appointment_end_date==undefined){
      return false;
    }
    this.api.getApplications(this.api.appointment_start_date,this.api.appointment_end_date);
  }


}

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
    this.api.resetApplicationResults();
    this.api.loadError = '';
    this.api.exportError = '';
    this.api.hasLoaded = false;
    this.api.searchQuery = false;
    this.api.appointment_start_date = undefined;
    this.api.appointment_end_date = undefined;
    this.api.center_id = false;
    this.api.status = this.status;
  }
  onCenterSelected(id){
    this.center_id = id;
    this.api.center_id = id || false;
    if(this.api.appointment_start_date == undefined || this.api.appointment_end_date==undefined){
      return false;
    }
    this.api.getApplications(this.api.appointment_start_date,this.api.appointment_end_date,'individual-report'); 
  }

  onStatusSelected(status){
    this.status = status;
    this.api.status= status;
    if(this.api.appointment_start_date == undefined || this.api.appointment_end_date==undefined){
      return false;
    }
    this.api.getApplications(this.api.appointment_start_date,this.api.appointment_end_date,'individual-report');
  }


}

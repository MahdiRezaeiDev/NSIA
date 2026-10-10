import { Component, OnInit } from '@angular/core';
import { Api } from '../Api';


@Component({
  selector: 'app-audit-report',
  templateUrl: './audit-report.component.html',
  styleUrls: ['./audit-report.component.css']
})
export class AuditReportComponent implements OnInit {
  public center_id="false";
  public status   = 0;
  public reportType="";
  constructor(public api:Api) { 
    this.api.selectedDate=false;
  }
  ngOnInit() {
    this.api.events=[];
  }
  onCenterSelected(id){
    this.api.center_id = id;
  }
  onStatusSelected(id){
    
  }
  selectReportType(type){
    this.reportType = type;
    this.api.events=[];
  }
  isReportSelected(type){
    return this.reportType == type;
  } 

}

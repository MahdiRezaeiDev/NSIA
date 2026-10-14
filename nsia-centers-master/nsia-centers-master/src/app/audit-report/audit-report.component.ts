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
  public reportType='check';
  constructor(public api:Api) { 
    this.api.selectedDate=false;
  }
  ngOnInit() {
    if (this.api.httpRequest) { this.api.httpRequest.unsubscribe(); }
    this.api.processing = false;
    this.api.center_id = false;
    this.api.events=[];
    this.api.loadError = '';
    this.api.exportError = '';
    this.api.hasLoaded = false;
  }
  onCenterSelected(id){
    this.center_id = id;
    this.api.center_id = id || false;
  }
  onStatusSelected(id){
    
  }
  selectReportType(type){
    if (this.api.httpRequest) { this.api.httpRequest.unsubscribe(); }
    this.api.processing = false;
    this.reportType = type;
    this.api.events=[];
  }
  isReportSelected(type){
    return this.reportType == type;
  } 

}

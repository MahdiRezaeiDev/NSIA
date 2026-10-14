import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { timeout, finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessageComponent } from './error-message/error-message.component';
import {HttpParams} from "@angular/common/http";
import { EchoService } from 'ngx-laravel-echo';
import {environment} from '../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExportToCsv } from 'export-to-csv';
import * as FileSaver from 'file-saver';
@Injectable()
export class Api {
  public endpoint:string=environment.url+"/api";
  public processing:boolean=false;
  public totalApplicationsCount=0;
  public loadError = '';
  public hasLoaded = false;
  public exporting = false;
  public exportError = '';
  private token:string="";
  public isLoggedInEvent:any=false;
  public httpOptions = {};
  public userDetails:any;
  public status:any=false;
  public selectedDate:any=false;
  public searchQuery =false;
  public center_id:any   = "false";
  public httpRequest;
  public applications:any=[];
  public events:any=[];
  public appointment_start_date;
  public appointment_end_date;
  public generalReport:any=[];
  public statusList:any=[];
  constructor(private http: HttpClient,private modalService:NgbModal,public echoService:EchoService,private spinner:NgxSpinnerService) {    
    if(localStorage && localStorage.hasOwnProperty('_token')){
        this.setToken(localStorage._token);
  
        this.setUserDetails(JSON.parse(localStorage.user_details));
    }

    this.isLoggedInEvent = new BehaviorSubject<boolean>(false);
  }

  public process(action:String,data:any,type:String="post"){
  
        let url = this.getUrl(action);
    
        if(type == 'post'){
            return this.http.post( url ,data ,this.httpOptions);
        }
        this.httpOptions['params']= data;
        return this.http.get( url ,this.httpOptions);
  }

  public getUrl(action):string{
      return this.endpoint+action;
  }
  setToken(token:string){
      localStorage['_token'] = token;
      this.token = token;
      this.httpOptions={
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+token
      })
    };

    this.echoService.echo.connector.options.auth.headers['Authorization']="Bearer "+token;
    
 
  }
  public login(){
    this.isLoggedInEvent.next(true);
  }

  public setUserDetails(details){
    this.userDetails = details;
    localStorage['user_details'] = JSON.stringify(details);
  }

  public logout(){
      this.userDetails={};
      localStorage.removeItem('_token');
      localStorage.removeItem('user_details');
      localStorage.removeItem('status');
      localStorage.removeItem('center_id');
      this.clearLocalStorageInfo();
     
  }

  public isLoggedIn(){
    let token = localStorage.getItem('_token');
    if(token){
      return true;
    }

    return false;
  }

  displayErrors(errors){
    const modalRef = this.modalService.open(ErrorMessageComponent);

    modalRef.componentInstance.errors= errors;
    modalRef.componentInstance.message= 'یک مشکل رخ داد';
  }
  getToken(){
    return localStorage.getItem('_token');
  }

  public isAdmin(){

    if(this.userDetails){
      return this.userDetails.role == 'admin' || this.userDetails.role == 'center_manager';
    }
   
    return false;
  }
  public isAudit(){

    if(this.userDetails){
      return this.userDetails.role == 'audit';
    }
   
    return false;
  }
  public isVerification(){

    if(this.userDetails){
      return this.userDetails.role == 'id_verifier';
    }
   
    return false;
  }
  public canChangeStatus(){
   
    if(this.userDetails){
      return this.userDetails.role == 'admin' || this.userDetails.role == 'team_leader' || this.userDetails.role == 'center_manager';
    }
   
    return false;
  }

  public clearLocalStorageInfo(){
    localStorage.removeItem('_user_details');
    localStorage.removeItem('_token');
    localStorage.removeItem('status');
    localStorage.removeItem('center_id');
    localStorage.removeItem('selectedDate');
  }



  getApplications(start_date?,end_date?,type='individual'){
    if(this.isAudit() && type=='check'){
      return this.getCheckEvents(start_date,end_date);
    }
    if(this.isAudit() && type=='appointment'){
      return this.getTransferEvents(start_date,end_date);
    }
    if(type == 'general'){
      return this.getGeneralReport(start_date,end_date);
    }
   
    let params={};
    let selectedDate = this.selectedDate;
    if(start_date!=undefined){
      this.appointment_start_date = start_date;
      params['appointment_start_date'] = this.formatDate(start_date);
    }
    if(end_date!=undefined){
      this.appointment_end_date = end_date;
      params['appointment_end_date'] = this.formatDate(end_date);
    }
    if(this.searchQuery){
      params = {q:this.searchQuery};
      selectedDate=false;
    }
    if(selectedDate){
      params={appointment_year:selectedDate.y,appointment_month:selectedDate.m,appointment_day:selectedDate.d}
    }
    if(this.center_id == "false"){
      this.center_id = false;
    }
    if(this.center_id!==false){
      params['center_id'] = this.center_id;
    }
    
    if( this.status == "false"  ){
        this.status =false;
      
    }
    
    if(this.status!==false){
      params['status']=this.status;
    }
 
    if(this.processing){
        if (this.httpRequest) { this.httpRequest.unsubscribe(); }
    }
    
    this.processing=true;
    this.loadError = '';
    this.hasLoaded = true;
    this.httpRequest=this.process("/getIndividualApplications",params,"GET").pipe(timeout(30000)).subscribe((res:any)=>{
      
          this.applications = res.applications.data || [];
          this.totalApplicationsCount = res.applications.total == null ? this.applications.length : res.applications.total;
          
          this.processing=false;
        
      },(error)=>{
          this.loadError = 'دریافت معلومات انجام نشد. لطفاً دوباره کوشش کنید.';
          
          this.processing=false;
      
      });
  }

  getCheckEvents(start_date,end_date){
    if(!this.center_id || this.center_id === 'false'){
      this.loadError = 'لطفاً یکی از مراکز را انتخاب کنید.';
      return false;
    }
    let params={};
    if(start_date!=undefined){
      this.appointment_start_date = start_date;
      params['appointment_start_date'] = this.formatDate(start_date);
    }
    if(end_date!=undefined){
      this.appointment_end_date = end_date;
      params['appointment_end_date'] = this.formatDate(end_date);
    }

    if(this.center_id!==false){
      params['center_id'] = this.center_id;
    }
   
    if(this.processing){
        if (this.httpRequest) { this.httpRequest.unsubscribe(); }
    }
    this.events=[];
    this.processing=true;
    this.loadError = '';
    this.hasLoaded = true;
    this.httpRequest=this.process("/getAuditReport",params,"GET").pipe(timeout(30000)).subscribe((res:any)=>{
      
          this.events = res;
          
          this.processing=false;
        
      },(error)=>{
          this.loadError = 'دریافت معلومات انجام نشد. لطفاً دوباره کوشش کنید.';
          
          this.processing=false;
      
      });
  }

  getTransferEvents(start_date,end_date){
    if(!this.center_id || this.center_id === 'false'){
      this.loadError = 'لطفاً یکی از مراکز را انتخاب کنید.';
      return false;
    }
    let params={};
    if(start_date!=undefined){
      this.appointment_start_date = start_date;
      params['appointment_start_date'] = this.formatDate(start_date);
    }
    if(end_date!=undefined){
      this.appointment_end_date = end_date;
      params['appointment_end_date'] = this.formatDate(end_date);
    }

    if(this.center_id!==false){
      params['center_id'] = this.center_id;
    }
   
    if(this.processing){
        if (this.httpRequest) { this.httpRequest.unsubscribe(); }
    }
    this.events=[];
    this.processing=true;
    this.loadError = '';
    this.hasLoaded = true;
    this.httpRequest=this.process("/getTransferReport",params,"GET").pipe(timeout(30000)).subscribe((res:any)=>{
      
          this.events = res;
          
          this.processing=false;
        
      },(error)=>{
          this.loadError = 'دریافت معلومات انجام نشد. لطفاً دوباره کوشش کنید.';
          
          this.processing=false;
      
      });
  }


  getForms(){
    if(this.processing){
      return false;
    }
    this.processing=true;
    this.loadError = '';
    this.hasLoaded = true;
    let params ={};
    if(this.searchQuery){
      params = {q:this.searchQuery};
    }
    if(this.status!==false){
      params['status']=this.status;
    }
    if(this.center_id == "false"){
      this.center_id = false;
    }
    if(this.center_id!==false){
      params['center_id'] = this.center_id;
    }
    
    if( this.status == "false"  ){
        this.status =false;
    }
    
    if(this.status!==false){
      params['status']=this.status;
    }
    this.httpRequest=this.process("/getApplications",params,"GET").pipe(timeout(30000)).subscribe((res:any)=>{
          this.applications = res.applications;
          this.statusList = res.statusList;
          this.totalApplicationsCount = res.total_applications;
          
          this.processing=false;
        
      },(error)=>{
          this.loadError = 'دریافت معلومات انجام نشد. لطفاً دوباره کوشش کنید.';
          
          this.processing=false;
      
      });
  }

  getGeneralReport(start_date?,end_date?){
    
   
    let params={};
    let selectedDate = this.selectedDate;
    if(start_date!=undefined){
      this.appointment_start_date = start_date;
      params['appointment_start_date'] = this.formatDate(start_date);
    }
    if(end_date!=undefined){
      this.appointment_end_date = end_date;
      params['appointment_end_date'] = this.formatDate(end_date);
    }
    if(this.searchQuery){
      params = {q:this.searchQuery};
      selectedDate=false;
    }
    if(selectedDate){
      params={appointment_year:selectedDate.y,appointment_month:selectedDate.m,appointment_day:selectedDate.d}
    }
    if(this.center_id == "false"){
      this.center_id = false;
    }
    if(this.center_id!==false){
      params['center_id'] = this.center_id;
    }
    
    if( this.status == "false"  ){
        this.status =false;
    }
    
    if(this.status!==false){
      params['status']=this.status;
    }
    
    if(this.processing){
        if (this.httpRequest) { this.httpRequest.unsubscribe(); }
    }
    
    this.processing=true;
    this.loadError = '';
    this.hasLoaded = true;
      try{
        this.httpRequest=this.process("/getStats",params,"GET").pipe(timeout(30000)).subscribe((res:any)=>{
          this.applications = res;
          
          this.processing=false;
        
      },(error)=>{
          this.loadError = 'دریافت معلومات انجام نشد. لطفاً دوباره کوشش کنید.';
          
          this.processing=false;

      });
    }
    catch(error){
      
    }
    
  }

  formatDate(d){
    return typeof d === 'string' ? d : d.year+"-"+d.month+"-"+d.day;
  }

  exportToCsv(){
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'applications',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      headers: ['family_form_reference_no', 'name']
    };
   
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.applications.map((f)=>{
       
        return {
          family_form_reference_no:f.family_form_reference_no,
          reference_no:f.reference_no,
          appointment_date:f.appointment_date,
          total_applicants:f.total_applicants,
          name:f.name,
          surname:f.surname,
          father_name:f.father_name,
          center_name:f.center_name,
          primary_contact_no:f.primary_contact_no.toString(),
          secondary_contact_no:f.secondary_contact_no==null? '':f.secondary_contact_no.toString()
        }
    }));
  }


  exportToXls(action){
    if (this.exporting) { return; }
    const httpOptions = Object.assign({}, this.httpOptions);
    httpOptions['responseType'] = 'blob';
    this.exporting = true;
    this.exportError = '';
    this.http.get(this.endpoint + action, httpOptions).pipe(
      timeout(60000), finalize(() => this.exporting = false)
    ).subscribe(res => this.downloadFile(res), () => {
      this.exportError = 'دانلود راپور انجام نشد. لطفاً دوباره کوشش کنید.';
    });
  }

  downloadFile(data) {
    var blob = new Blob([data], {type: "application/vnd.ms-excel;charset=utf-8"});
    FileSaver.saveAs(blob, "report.xlsx");
  }
  public isIdVerificationReference(reference_no){
    let numbers = reference_no.split("-");
    let referenceNoWithoutDash=reference_no.replace(/-/g,"");
    if(numbers.length == 3 && referenceNoWithoutDash.length == 8){
      return true;
    }
    return false;
  }
}

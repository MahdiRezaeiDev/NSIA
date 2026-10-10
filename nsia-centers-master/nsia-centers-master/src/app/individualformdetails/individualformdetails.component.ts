import { Component, OnInit, OnDestroy,Input,AfterViewInit } from '@angular/core';
import { Api } from '../Api';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import {ImagePipe} from '../image.pipe';
import { HttpClient } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { VerificationModalComponent } from '../verification-modal/verification-modal.component';
import { ShowImageModalComponent } from '../show-image-modal/show-image-modal.component';
@Component({
  selector: 'app-individualformdetails',
  templateUrl: './individualformdetails.component.html',
  styleUrls: ['./individualformdetails.component.css']
})

export class IndividualformdetailsComponent implements OnInit,OnDestroy{
  private _reference_no:string;
  @Input() set reference_no(val:string){
    this._reference_no = val;
    this.getApplicationDetails();
  }

  get reference_no(){
    return this._reference_no;
  }
  public  applicant:any;
  public  members:any;
  public  attachments =[];
  public  opened_panel="ngb-panel-0";
  public  queue_no="";
  public  actions:any=[];
  public  total_applicants=0;
  public  processes:any=[];
  public loadGallery=false;
  public matches:any=[];
  constructor(public api:Api,public spinner:NgxSpinnerService,private router:Router,private http:HttpClient,private modal:NgbModal) { 
    
  }

  ngOnInit() {
    //this.spinner.show();
    
   
    
    
  }


  getApplicationDetails(){
    //this.spinner.show();
   
    if(this.api.isVerification()){
      this.getMatches(this.reference_no);
    }
    
    this.api.process("/individualapplication-details",{reference_no:this.reference_no},'GET').subscribe((res:any)=>{
      this.applicant    = res.application;
      this.members      = res.members;
      this.getAttachments(this.reference_no);
      this.total_applicants = res.total_applicants;
      this.queue_no     = res.queue_no;
      this.actions      = res.actions;
      this.processes    = res.processes;
      this.spinner.hide();
      
      this.opened_panel="ngb-panel-0";
      this.api.process("/applicationOpened",{reference_no:this.reference_no},"GET").subscribe(res=>{
     
      },res=>{
      
      });
    },(error)=>{
     this.spinner.hide();
    });
  }

 public panelChanged(event){
    this.opened_panel = event.panelId;
 }
 public isOpened(id){
    if(this.opened_panel == id){
      return true;
    }

    return false;
 }

 public changeStatus(path){
   let con = confirm('آیا مطمین هستید که این درخواستی را به مرحله بعدی انتقال دهید؟');
  if(!con){
    return false;
  }
   let ahead=this.showVerificationPopUp(path);

   if(!ahead){
     return false;
   }

   this.processAction(path);
 }

 ngOnDestroy(){

  this.api.process("/applicationClosed",{reference_no:this.reference_no},"GET").subscribe(res=>{
    
  });
 }

 getAttachments(reference_no){
   this.attachments=[];
   this.api.process("/getAttachments",{reference_no:reference_no},'GET').subscribe((res:any)=>{
      this.attachments = res;
      this.loadGallery=true;
   });
 }

 currentMemberIndex(){
    let index=this.members.findIndex((e)=>{
      console.log('log',e.apply_for_new_id);
      if(e.apply_for_new_id=='بلی'){
        return e.reference_no == this.reference_no;
      }

     
    });
    console.log('index found',index);
    return index;
 }

 public showVerificationPopUp(path){
    let params:any = this.getUrlParams(path);
    if(params.hasOwnProperty('status') && params.status == '4'){
      let modal=this.modal.open(VerificationModalComponent,{ size: 'xl' });
          modal.componentInstance.reference_no = this.reference_no;
          modal.result.then((result)=>{
            console.log('RESULT',result);
           
            
              let index = this.currentMemberIndex();
              if( index > -1 ){
                  let member = this.members[index+1];
                  if(member!==undefined && member.apply_for_new_id=='بلی'){
                    this.reference_no = member.reference_no;
                  }else{
                    this.reference_no = this.members[0].reference_no;
                  }
                  
              }else{
                  this.reference_no = this.members[0].reference_no;
              }

              this.getApplicationDetails();
          });
      return false;
    }
    return  true;
 }

 private getUrlParams(url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

private processAction(path){
  this.spinner.show();
  this.api.process(path,{},'GET').subscribe(res=>{
  
   let index = this.currentMemberIndex();
   if( index > -1 ){
       let member = this.members[index+1];
       if(member!==undefined && member.apply_for_new_id=='بلی'){
         this.reference_no = member.reference_no;
       }else{
         this.reference_no = this.members[0].reference_no;
       }
      
   }else{
       this.reference_no = this.members[0].reference_no;
   }
   this.getApplicationDetails();
   
  },(errors)=>{
     this.spinner.hide();
     this.api.displayErrors(errors.error.errors);
  });
}
 
  public getMartialStatus(status){
    if(status == "1"){
      return 'متاهل';
    }else if(status == "2"){
      return 'مجرد';
    }
    else if(status == "3"){
      return 'بیوه';
    }
    else if(status == "4"){
      return 'طلاق';
    }
  }

  public getMatches(reference_no){
    this.matches=[];
    console.log('GETTING MATCHES');
    this.api.process("/getMatches?reference_no="+reference_no,{},"GET").subscribe((res)=>{
      console.log('response',res);
      this.matches= res;
    },function(){
      alert('Can not get matches');
    });
  }


  public openModal(record,type){
      let modal=this.modal.open(ShowImageModalComponent,{ size: 'xl' });
          modal.componentInstance.record      = record;
          modal.componentInstance.type        = type;
          modal.componentInstance.actions     = this.actions;
          modal.componentInstance.application = this.applicant;
          modal.componentInstance.attachments = this.attachments;
          modal.result.then((result)=>{          
            console.log('RESULT',result);
            let index = this.currentMemberIndex();
              if( index > -1 ){
                  let member = this.members[index+1];
                  if(member!==undefined && member.apply_for_new_id=='بلی'){
                    this.reference_no = member.reference_no;
                  }else{
                    this.reference_no = this.members[0].reference_no;
                  }
                  
              }else{
                  this.reference_no = this.members[0].reference_no;
              }

              this.getApplicationDetails();
        });
        
      return false;
    return  true;
 }
}

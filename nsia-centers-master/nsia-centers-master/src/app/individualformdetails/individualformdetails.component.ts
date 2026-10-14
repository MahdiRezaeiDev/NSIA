import { Component, OnDestroy, Input } from '@angular/core';
import { Api } from '../Api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, timeout, finalize } from 'rxjs/operators';
import { VerificationModalComponent } from '../verification-modal/verification-modal.component';
import { ShowImageModalComponent } from '../show-image-modal/show-image-modal.component';
@Component({selector:'app-individualformdetails',templateUrl:'./individualformdetails.component.html',styleUrls:['./individualformdetails.component.css']})
export class IndividualformdetailsComponent implements OnDestroy {
 private _reference_no:string;
 @Input() set reference_no(val:string){this._reference_no=val;if(val){this.getApplicationDetails();}}
 get reference_no(){return this._reference_no;}
 public applicant:any; public members:any=[]; public attachments:any=[]; public opened_panel='ngb-panel-0';
 public queue_no=''; public actions:any=[]; public total_applicants=0; public processes:any=[]; public loadGallery=false; public matches:any=[];
 public loading=false; public errorMessage=''; public attachmentError=''; public matchesError=''; public actionPending=false; public actionError='';
 private destroyed=new Subject<void>(); private changed=new Subject<void>(); private attachmentRequest:Subscription;
 constructor(public api:Api,private modal:NgbModal){}
 getApplicationDetails(){
  this.changed.next();this.loading=true;this.errorMessage='';this.actionError='';this.matches=[];this.matchesError='';
  this.attachments=[];this.loadGallery=false;this.attachmentError='';
  if(this.api.isVerification()){this.getMatches(this.reference_no);}
  this.api.process('/individualapplication-details',{reference_no:this.reference_no},'GET')
   .pipe(timeout(30000),takeUntil(this.changed),takeUntil(this.destroyed),finalize(()=>this.loading=false)).subscribe((res:any)=>{
    this.applicant=res.application;this.members=res.members || [];this.total_applicants=res.total_applicants;
    this.queue_no=res.queue_no;this.actions=res.actions || [];this.processes=res.processes || [];this.opened_panel='ngb-panel-0';
    this.getAttachments(this.reference_no);
    this.api.process('/applicationOpened',{reference_no:this.reference_no},'GET').pipe(takeUntil(this.destroyed)).subscribe(()=>{},()=>{});
   },()=>this.errorMessage='دریافت معلومات درخواستی انجام نشد.');
 }
 panelChanged(event){this.opened_panel=event.panelId;}
 isOpened(id){return this.opened_panel===id;}
 getAttachments(reference_no){
  if(this.attachmentRequest){this.attachmentRequest.unsubscribe();}
  this.loadGallery=false;this.attachmentError='';this.attachments=[];
  this.attachmentRequest=this.api.process('/getAttachments',{reference_no:reference_no},'GET')
   .pipe(timeout(30000),takeUntil(this.changed),takeUntil(this.destroyed),finalize(()=>this.loadGallery=true)).subscribe(
    (res:any)=>this.attachments=res || [],()=>this.attachmentError='دریافت ضمایم انجام نشد.');
 }
 currentMemberIndex(){return this.members.findIndex(e=>e.apply_for_new_id==='بلی' && e.reference_no===this.reference_no);}
 private nextMember(){
  const index=this.currentMemberIndex(), next=this.members[index+1];
  const target=index>-1 && next && next.apply_for_new_id==='بلی' ? next : this.members[0];
  if(target){this.reference_no=target.reference_no;}else{this.getApplicationDetails();}
 }
 changeStatus(path){
  if(this.actionPending || !confirm('آیا مطمئن هستید که این درخواستی را به مرحلهٔ بعدی انتقال دهید؟')){return;}
  if(this.showVerificationPopUp(path)){this.processAction(path);}
 }
 showVerificationPopUp(path){
  const url=document.createElement('a');url.href=path;
  const params=new URLSearchParams(url.search);
  if(params.get('status')==='4'){
   const modal=this.modal.open(VerificationModalComponent,{size:'xl',ariaLabelledBy:'verification-title'});
   modal.componentInstance.reference_no=this.reference_no;
   modal.result.then(()=>this.nextMember(),()=>{});return false;
  }
  return true;
 }
 private processAction(path){
  this.actionPending=true;this.actionError='';
  this.api.process(path,{},'GET').pipe(takeUntil(this.destroyed),finalize(()=>this.actionPending=false)).subscribe(
   ()=>this.nextMember(),()=>this.actionError='تغییر مرحله انجام نشد. لطفاً وضعیت درخواستی را بررسی کنید.');
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


 getMatches(reference_no){
  this.api.process('/getMatches?reference_no='+reference_no,{},'GET').pipe(timeout(30000),takeUntil(this.changed),takeUntil(this.destroyed)).subscribe(
   (res:any)=>this.matches=res || [],()=>this.matchesError='دریافت معلومات مقایسه انجام نشد.');
 }
 openModal(record,type){
  const modal=this.modal.open(ShowImageModalComponent,{size:'xl',ariaLabelledBy:'comparison-title'});
  Object.assign(modal.componentInstance,{record:record,type:type,actions:this.actions,application:this.applicant,attachments:this.attachments});
  modal.result.then(()=>this.nextMember(),()=>{});
 }
 ngOnDestroy(){
  this.destroyed.next();this.destroyed.complete();this.changed.complete();
  if(this.reference_no){this.api.process('/applicationClosed',{reference_no:this.reference_no},'GET').subscribe(()=>{},()=>{});}
 }
}

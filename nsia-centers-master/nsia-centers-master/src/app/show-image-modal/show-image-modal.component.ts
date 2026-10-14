import { Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Api } from '../Api';
import { Subject } from 'rxjs';
import { takeUntil, timeout, finalize } from 'rxjs/operators';
@Component({selector:'app-show-image-modal',templateUrl:'./show-image-modal.component.html',styleUrls:['./show-image-modal.component.css']})
export class ShowImageModalComponent implements OnInit, OnDestroy {
 @Input() record:any={}; @Input() attachments:any=[]; @Input() actions:any=[]; @Input() application:any;
 @Input() type:any=''; @Output() changeStatusEvent=new EventEmitter();
 public image:any='';public loading=false;public submitting=false;public errorMessage='';public imageError='';
 private destroyed=new Subject<void>();
 constructor(public ref:NgbActiveModal,private api:Api){}
 ngOnInit(){this.getImage();}
 getImage(){
  if(this.loading){return;}this.loading=true;this.imageError='';this.image='';
  const id=this.type==='full' ? this.record.page_id : this.record.record_id;
  this.api.process('/getIvpImage',{pageNumber:id,type:this.type},'GET')
   .pipe(timeout(30000),takeUntil(this.destroyed),finalize(()=>this.loading=false)).subscribe(
    (result:any)=>{this.image=result.image;if(!this.image){this.imageError='تصویر کتاب اساس موجود نیست.';}},
    ()=>this.imageError='دریافت تصویر انجام نشد.');
 }
 verify(){
  if(this.submitting || !confirm('آیا مطمئن هستید که این درخواستی را به مرحلهٔ بعدی انتقال دهید؟')){return;}
  this.submitting=true;this.errorMessage='';
  this.api.process('/updateVerificationReference',{
   reference_no:this.application.reference_no,verification_type:'system2',verification_reference_no:this.record.record_id
  },'GET').pipe(finalize(()=>this.submitting=false)).subscribe(
   ()=>this.ref.close(this.application.reference_no),()=>this.errorMessage='ثبت تثبیت هویت انجام نشد. لطفاً معلومات را بررسی کنید.');
 }
 ngOnDestroy(){this.destroyed.next();this.destroyed.complete();}
}

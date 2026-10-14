import { Component, OnChanges, OnDestroy, Input } from '@angular/core';
import { Api } from '../Api';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, timeout, finalize } from 'rxjs/operators';
@Component({selector:'app-note',templateUrl:'./note.component.html',styleUrls:['./note.component.css']})
export class NoteComponent implements OnChanges, OnDestroy {
 public note=''; public notes:any=[]; public loading=false; public saving=false; public errorMessage=''; public saved=false;
 @Input() reference_no:any=''; @Input() application_type='';
 private destroyed=new Subject<void>(); private request:Subscription;
 constructor(private api:Api){}
 ngOnChanges(changes:any){if(changes.reference_no && this.reference_no){this.note='';this.saved=false;this.getNotes();}}
 saveNote(){
  if(this.saving){return;}
  this.errorMessage='';this.saved=false;
  if(!this.note.trim()){this.errorMessage='لطفاً متن یادداشت را بنویسید.';return;}
  this.saving=true;
  this.api.process('/saveNote',{note:this.note,type:this.application_type,reference_no:this.reference_no})
   .pipe(takeUntil(this.destroyed),finalize(()=>this.saving=false)).subscribe(()=>{
    this.note='';this.saved=true;this.getNotes();
   },()=>this.errorMessage='ثبت یادداشت انجام نشد. لطفاً معلومات را بررسی کنید.');
 }
 getNotes(){
  if(this.request){this.request.unsubscribe();}
  this.loading=true;this.errorMessage='';
  this.request=this.api.process('/getNotes',{reference_no:this.reference_no,type:this.application_type},'GET')
   .pipe(timeout(30000),takeUntil(this.destroyed),finalize(()=>this.loading=false)).subscribe(
    (res:any)=>this.notes=res,()=>this.errorMessage='دریافت یادداشت‌ها انجام نشد.');
 }
 ngOnDestroy(){this.destroyed.next();this.destroyed.complete();}
}

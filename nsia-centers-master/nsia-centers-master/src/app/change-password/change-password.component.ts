import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil, timeout } from 'rxjs/operators';
import { Api } from '../Api';
import { Router } from '@angular/router';
@Component({ selector:'app-change-password', templateUrl:'./change-password.component.html', styleUrls:['./change-password.component.css'] })
export class ChangePasswordComponent implements OnInit, OnDestroy {
  form: FormGroup;
  saving = false; submitted = false; visible = false; errorMessage = '';
  private destroyed = new Subject<void>();
  constructor(private api:Api, private router:Router, private fb:FormBuilder) {}
  ngOnInit() { this.form=this.fb.group({password:['',[Validators.required,Validators.minLength(7)]]}); }
  changePassword() {
    if (this.saving) { return; }
    this.submitted=true; this.errorMessage='';
    if (this.form.invalid) { return; }
    this.saving=true;
    this.api.process('/changePassword',this.form.value).pipe(timeout(30000),takeUntil(this.destroyed),finalize(()=>this.saving=false)).subscribe((res:any)=>{
      if (res.status==='ok') { this.router.navigate(['/dashboard']); }
      else { this.errorMessage='رمز عبور ثبت نشد. دوباره کوشش کنید.'; }
    },()=>this.errorMessage='رمز عبور ثبت نشد. اتصال خود را بررسی کرده و دوباره کوشش کنید.');
  }
  ngOnDestroy() { this.destroyed.next(); this.destroyed.complete(); }
}

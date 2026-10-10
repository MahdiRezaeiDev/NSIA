import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Api } from '../Api';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  forgetPasswordLink:string="";
  inputType = 'password';
  visible = false;
  

  public errors:any=[];
  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private api:Api,
              private spinner:NgxSpinnerService
    
  ) {
    this.forgetPasswordLink = this.api.endpoint.replace("api","password/reset");
    this.spinner.show();
    console.log('DETAILS',this.api.userDetails);
    this.api.process('/isLoggedIn',{},"GET").subscribe((res:any)=>{
      if(this.api.isAudit()){
        this.router.navigate(["/audit-report"]);
      }
      if(this.api.userDetails.role =='admin' || this.api.userDetails.role =='team_leader' || this.api.userDetails.role =='center_manager'){
        this.router.navigate(['/admin-dashboard']);
      }else{
        this.router.navigate(['/dashboard']);
      }
     
      this.spinner.hide();
    },(error)=>{
        this.api.logout();
        this.spinner.hide();
    });

  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  
  }
  login() {
    //this.router.navigate(['/']);
    this.api.clearLocalStorageInfo();
    this.spinner.show();
    this.api.process("/login",this.form.value).subscribe((res:any)=>{
      this.api.setToken(res.token);
      this.api.setUserDetails(res.user_details);
      this.spinner.hide();
      if(res.user_details.role == 'admin' || res.user_details.role == 'team_leader'  || res.user_details.role == 'center_manager'){
        this.router.navigateByUrl("/admin-dashboard");
      }else{
        this.router.navigateByUrl("/dashboard");
      }
     
    },(errors)=>{
      this.spinner.hide();
       this.api.displayErrors(errors.error.errors);
    });
  }


  

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';
import { Api } from '../Api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public form:FormGroup;
  constructor( private api:Api,private router:Router,private fb:FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', Validators.required]
    });
  }

  changePassword(){
      this.api.process('/changePassword',this.form.value).subscribe( (res:any)=>{
        if(res.status == 'ok'){
          this.router.navigate(['/dashboard']);
        }
      },(res)=>{  
        this.api.displayErrors(res.error.errors);
      });
  }

}

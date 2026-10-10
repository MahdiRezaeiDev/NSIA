import { Component, OnInit } from '@angular/core';
import { Api } from '../Api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public centers:any;
  constructor(private api:Api,private spinner:NgxSpinnerService,private router:Router) { }
  ngOnInit() {
    this.getDashboard();
  }
  getDashboard(){
    this.spinner.show();
    this.api.process("/getDashboard",{},'GET').subscribe( (res:any)=>{
        this.centers = res;
        this.spinner.hide();
    },(e)=>{
        alert('یک مشکل رخ داد لطفا دوباره کوشش نمایید');
        this.spinner.hide();
        if(e.status == 401){
          this.api.logout();
          this.router.navigateByUrl("/login");
        }
        console.log('STATUS',e);
    });
  }
}

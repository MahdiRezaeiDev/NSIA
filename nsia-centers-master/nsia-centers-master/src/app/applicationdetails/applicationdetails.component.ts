import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-applicationdetails',
  templateUrl: './applicationdetails.component.html',
  styleUrls: ['./applicationdetails.component.css']
})
export class ApplicationdetailsComponent implements OnInit {
  public reference_no="";
  public application_type:string;
  constructor(private _Activatedroute:ActivatedRoute,private router:Router) { 
   
    this.router.events.subscribe((val)=>{
 
      if( val instanceof NavigationEnd){
        this.reference_no=this._Activatedroute.snapshot.paramMap.get("reference_no");
        this.application_type = this._Activatedroute.snapshot.paramMap.get("application_type");
  
      }
      
    })
  

  }

  ngOnInit() {
    console.log('REFERNCE_no',this.reference_no);
  }

}

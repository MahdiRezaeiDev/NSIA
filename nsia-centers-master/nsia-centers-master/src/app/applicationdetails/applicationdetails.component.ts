import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({selector:'app-applicationdetails',templateUrl:'./applicationdetails.component.html',styleUrls:['./applicationdetails.component.css']})
export class ApplicationdetailsComponent implements OnInit, OnDestroy {
 public reference_no=''; public application_type:string; private destroyed=new Subject<void>();
 constructor(private route:ActivatedRoute){}
 ngOnInit(){this.route.paramMap.pipe(takeUntil(this.destroyed)).subscribe(params=>{
  this.reference_no=params.get('reference_no');this.application_type=params.get('application_type');
 });}
 ngOnDestroy(){this.destroyed.next();this.destroyed.complete();}
}

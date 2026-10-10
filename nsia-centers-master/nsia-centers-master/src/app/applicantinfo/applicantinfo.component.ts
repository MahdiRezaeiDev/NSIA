import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualformdetailsComponent } from '../individualformdetails/individualformdetails.component';
import {Api} from '../Api';
@Component({
  selector: 'app-applicantinfo',
  templateUrl: './applicantinfo.component.html',
  styleUrls: ['./applicantinfo.component.css']
})
export class ApplicantinfoComponent implements OnInit {
  @Input() applicant:any;
  @Input() application_type:string;
  ngOnInit() {
    console.log('application',this.application_type);
  }
  constructor(private api:Api){

  }

  canOpen(){
      if(this.applicant){
        if(this.applicant.opened ==0 || this.api.userDetails.id == this.applicant.opened_by_user_id){
          return true;
        }else{
          return false;
        }
      }

      return false;
  }



}

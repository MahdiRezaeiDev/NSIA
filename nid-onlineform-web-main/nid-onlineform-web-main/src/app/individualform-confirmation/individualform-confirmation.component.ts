import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '../services/Api';
import {ViewChild, ElementRef} from '@angular/core';
@Component({
  selector: 'app-individualform-confirmation',
  templateUrl: './individualform-confirmation.component.html',
  styleUrls: ['./individualform-confirmation.component.css']
})
export class IndividualformConfirmationComponent implements OnInit {
  public submittedForm:any=false;
  constructor(private router:Router,public api:Api) { 
    this.submittedForm = this.router.getCurrentNavigation().extras.state.submittedForm;
  }

  ngOnInit() {
    
 
  }

}

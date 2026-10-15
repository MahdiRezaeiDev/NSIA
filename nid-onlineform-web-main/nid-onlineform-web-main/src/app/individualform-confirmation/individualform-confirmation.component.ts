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
  public submittedForm:any=null;
  constructor(private router:Router,public api:Api) { 
    const navigation = this.router.getCurrentNavigation();
    const navigationState = navigation && navigation.extras && navigation.extras.state;
    const savedState = typeof history !== 'undefined' && history.state;
    this.submittedForm = (navigationState && navigationState.submittedForm)
      || (savedState && savedState.submittedForm) || null;
  }

  ngOnInit() {
    
 
  }

}

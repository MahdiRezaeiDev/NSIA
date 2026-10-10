import { Component, OnInit } from '@angular/core';
import { Api } from "../services/Api";
@Component({
  selector: 'app-birth-registration',
  templateUrl: './birth-registration.component.html',
  styleUrls: ['./birth-registration.component.css']
})
export class BirthRegistrationComponent implements OnInit {

  constructor(public api:Api) { }

  ngOnInit() {
  }

}

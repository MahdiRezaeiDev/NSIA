import { Component } from '@angular/core';
import {Api} from "./Api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public api:Api){

  }
}

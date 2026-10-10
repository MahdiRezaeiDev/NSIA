import { Component, OnInit } from '@angular/core';
import { Api } from '../services/Api';
@Component({
  selector: 'app-id-correction',
  templateUrl: './id-correction.component.html',
  styleUrls: ['./id-correction.component.css']
})
export class IdCorrectionComponent implements OnInit {

  constructor(public api:Api) {
    
   }

  ngOnInit() {
  }

}

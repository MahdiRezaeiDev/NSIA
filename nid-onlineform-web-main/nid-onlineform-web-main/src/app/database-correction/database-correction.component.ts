import { Component, OnInit } from '@angular/core';
import { Api } from "../services/Api";
@Component({
  selector: 'app-database-correction',
  templateUrl: './database-correction.component.html',
  styleUrls: ['./database-correction.component.css']
})
export class DatabaseCorrectionComponent implements OnInit {

  constructor(public api:Api) { }

  ngOnInit() {
  }

}

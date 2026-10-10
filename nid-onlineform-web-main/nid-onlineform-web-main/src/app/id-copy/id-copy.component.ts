import { Component, OnInit } from '@angular/core';
import {Api} from '../services/Api';
@Component({
  selector: 'app-id-copy',
  templateUrl: './id-copy.component.html',
  styleUrls: ['./id-copy.component.css']
})
export class IdCopyComponent implements OnInit {

  constructor(public api:Api) { }

  ngOnInit() {
  }

}

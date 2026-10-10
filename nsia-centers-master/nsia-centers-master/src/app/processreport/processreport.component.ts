import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-processreport',
  templateUrl: './processreport.component.html',
  styleUrls: ['./processreport.component.css']
})
export class ProcessreportComponent implements OnInit {
  @Input() processes:any=[];
  constructor() { }

  ngOnInit() {
  }

}

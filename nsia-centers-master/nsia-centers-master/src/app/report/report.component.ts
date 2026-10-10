import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public reports=[
    {
      name:"راپور درخواستی های انفرادی ",
      path:"/individualforms-report"
    },
    {
      name:"راپور فعالیت",
      path:"/individualforms-general-report"
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}

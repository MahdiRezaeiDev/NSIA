import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'vex-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() errors:any=[];
  @Input() message:string="";

  constructor(public activeModal: NgbActiveModal) {
  }




}

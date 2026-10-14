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

  get errorList():string[] {
    if (!this.errors) { return []; }
    if (typeof this.errors === 'string') { return [this.errors]; }
    if (Array.isArray(this.errors)) { return this.errors; }
    return Object.keys(this.errors).reduce((items,key) => items.concat(this.errors[key]), []);
  }
  constructor(public activeModal: NgbActiveModal) {
  }




}

import { Component, OnInit,Input  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Api } from '../services/Api';
@Component({
  selector: 'app-form-saved-confirmation',
  templateUrl: './form-saved-confirmation.component.html',
  styleUrls: ['./form-saved-confirmation.component.css']
})
export class FormSavedConfirmationComponent implements OnInit {
  @Input() application_id;
  constructor(public activeModal: NgbActiveModal, public api:Api) {

  }

  ngOnInit() {
  }

}

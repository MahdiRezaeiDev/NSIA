import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Api } from '../Api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-show-image-modal',
  templateUrl: './show-image-modal.component.html',
  styleUrls: ['./show-image-modal.component.css']
})
export class ShowImageModalComponent implements OnInit {
  @Input() record:any={};
  @Input() attachments:any=[];
  @Input() actions:any=[];
  @Input() application:any;

  @Input() type:any="";
  public image:any="";
  @Output() changeStatusEvent = new EventEmitter();
  constructor(public ref:NgbActiveModal,private api:Api,private spinner:NgxSpinnerService) { 

  }

  ngOnInit() {
    this.getImage();
    console.log('RECORD',this.record);
  }

  getImage(){
      this.spinner.show();
     let id = this.type == 'full' ? this.record.page_id:this.record.record_id;
      this.api.process("/getIvpImage",{pageNumber:id,type:this.type},'GET').subscribe((result:any)=>{
        this.spinner.hide();
        this.image = result.image;
        console.log('result',result);
      },(result)=>{
        console.log('result');
        this.spinner.hide();
        this.image = result.image;
      });
  }

  public updateVerification(){
    this.spinner.show();
    this.api.process("/updateVerificationReference",{
      reference_no:this.application.reference_no,
      verification_type:'ivp',
      verification_reference_no:'system2',
    },'GET').subscribe((res)=>{
      this.ref.close(this.application.reference_no);
    },(error)=>{
      this.spinner.hide();
      alert('یک مشکل رخ داد لطفا دوباره کوشش نمایید');
    });


  }

  public verify(){
    let con = confirm('آیا مطمین هستید که این درخواستی را به مرحله بعدی انتقال دهید؟');
    if(!con){
      return false;
    }
    this.spinner.show();
    this.api.process("/updateVerificationReference",{
        reference_no:this.application.reference_no,
        verification_type:'system2',
        verification_reference_no:this.record.record_id
    },'GET').subscribe((res)=>{
        this.ref.close(this.application.reference_no);
    },(error)=>{
        this.spinner.hide();
        alert('یک مشکل رخ داد لطفا دوباره کوشش نمایید');
    });
  }
}

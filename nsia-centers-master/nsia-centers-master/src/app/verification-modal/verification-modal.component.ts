import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Api } from '../Api';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-verification-modal',
  templateUrl: './verification-modal.component.html',
  styleUrls: ['./verification-modal.component.css']
})
export class VerificationModalComponent implements OnInit {
  @Input() public reference_no = '';
  public verification_reference_no       = '';
  public verification_type    ='system';
  constructor(public ref:NgbActiveModal,private api:Api) { }

  public submitting=false;
  public errorMessage='';
  ngOnInit() {
  }
  public updateVerification(){
    if(this.submitting){return;}
    this.errorMessage='';
    if(!this.verification_reference_no.trim()){this.errorMessage='شمارهٔ تثبیت هویت را درج کنید.';return;}
    this.submitting=true;
    this.api.process("/updateVerificationReference",{
      reference_no:this.reference_no,
      verification_type:this.verification_type,
      verification_reference_no:this.verification_reference_no
    },'GET').pipe(finalize(()=>this.submitting=false)).subscribe((res)=>{
      this.ref.close(this.verification_reference_no);
    },(error)=>{

      this.errorMessage='ثبت تثبیت هویت انجام نشد. لطفاً معلومات را بررسی کنید.';
    });


  }

  verifiedByPhone(){
    this.verification_reference_no="تثبیت به اساس تماس";
    this.verification_type='phone';
  }
  verifiedByArchive(){
    this.verification_reference_no="تثبیت به اساس آرشیف";
    this.verification_type='archive';
  }
  verifiedBySystem(){
    this.verification_reference_no="";
    this.verification_type='system';
  }

  isButtonSelected(type){
    return this.verification_type == type;
  }
  

}

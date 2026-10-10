import { Component, OnInit,OnChanges, Input } from '@angular/core';
import { Api } from '../Api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit,OnChanges {
  public note:string="";
  public notes:any=[];
  @Input() reference_no:any="";
  @Input() application_type:string="";
  constructor(private api:Api,public spinner:NgxSpinnerService) {
   
  }

  ngOnInit() {
    if(this.notes.length == 0){
      this.getNotes();
    }
   
   
  }
  public ngOnChanges(changes: any) {
    if( 'reference_no' in changes){
        this.getNotes();
    }

  }   
  saveNote(){
    if(this.note.length == 0){
      alert('لطفا نوت را تایب نمایید');
      return false;
    }
    this.spinner.show();
    let data={
      note:this.note,
      type:this.application_type,
      reference_no:this.reference_no
    };
    this.api.process("/saveNote",data).subscribe(res=>{
      this.spinner.hide();
      this.note="";
      this.getNotes();
      
    },(errors)=>{
      this.api.displayErrors(errors.error.errors);
      this.spinner.hide();
    });
  }

  public getNotes(){
    this.spinner.show();
    this.api.process("/getNotes",{reference_no:this.reference_no,type:this.application_type},'GET').subscribe(res=>{
      this.notes = res;
      this.spinner.hide();
    },(errors)=>{
      this.api.displayErrors(errors.error.errors);
      this.spinner.hide();
  });
  }
}

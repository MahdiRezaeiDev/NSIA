import { Component, Input, OnChanges, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({selector:'app-document-viewer',templateUrl:'./document-viewer.component.html',styleUrls:['./document-viewer.component.css']})
export class DocumentViewerComponent implements OnChanges, OnDestroy {
 @Input() images:string[]=[];
 @ViewChild('viewport',{static:false}) viewport:ElementRef;
 public index=0; public zoom=1; public rotation=0; public expanded=false; public pdfOnly=false;
 public source=''; public pdfSource:SafeResourceUrl; public loading=true; public failed=false;
 public naturalWidth=1; public naturalHeight=1; public availableWidth=600;
 private blobUrl='';
 constructor(private sanitizer:DomSanitizer){}
 get isPdf(){return this.isPdfValue(this.items[this.index] || '');}
 get hasPdf(){return this.images.some(value=>this.isPdfValue(value));}
 get items(){return this.pdfOnly ? this.images.filter(value=>this.isPdfValue(value)) : this.images;}
 get turned(){return Math.abs(this.rotation % 180)===90;}
 get fit(){return Math.min((Math.max(100,this.availableWidth)-24)/(this.turned?this.naturalHeight:this.naturalWidth),480/(this.turned?this.naturalWidth:this.naturalHeight),1);}
 get imageWidth(){return this.naturalWidth*this.fit*this.zoom;}
 get imageHeight(){return this.naturalHeight*this.fit*this.zoom;}
 get sheetWidth(){return this.turned?this.imageHeight:this.imageWidth;}
 get sheetHeight(){return this.turned?this.imageWidth:this.imageHeight;}
 ngOnChanges(){this.index=0;this.pdfOnly=false;this.select();}
 private isPdfValue(value:string){return /^data:application\/pdf[;,]|^JVBER|\.pdf(?:[?#]|$)/i.test(value.trim());}
 select(){
  const previousSource=this.source, previouslyLoaded=!this.loading && !this.failed;
  this.release();this.source='';this.pdfSource=null;this.zoom=1;this.rotation=0;this.loading=true;this.failed=false;
  const value=(this.items[this.index] || '').trim();if(!value){this.failed=true;this.loading=false;return;}
  if(this.isPdf){
   if(/^https?:\/\//i.test(value)){this.pdfSource=this.sanitizer.bypassSecurityTrustResourceUrl(value);}
   else {
    try{
     const bytes=atob(value.replace(/^data:application\/pdf;base64,/,'')),array=new Uint8Array(bytes.length);
     for(let i=0;i<bytes.length;i++){array[i]=bytes.charCodeAt(i);}
     this.blobUrl=URL.createObjectURL(new Blob([array],{type:'application/pdf'}));
     this.pdfSource=this.sanitizer.bypassSecurityTrustResourceUrl(this.blobUrl);
    }catch(_){this.onError();}
   }
  }else if(/^(https?:\/\/|data:image\/(png|jpeg|jpg|gif|webp);base64,|blob:)/i.test(value)){this.source=value;}
  else if(/^[a-z0-9+/=\s]+$/i.test(value)){this.source='data:image/png;base64,'+value;}
  else{this.onError();}
  // An identical attachment keeps the same DOM image and does not emit another load event.
  if(this.source && this.source===previousSource && previouslyLoaded){this.loading=false;}
 }
 move(step:number){const next=this.index+step;if(next<0||next>=this.items.length){return;}this.index=next;this.select();}
 imageLoaded(event:any){this.naturalWidth=event.target.naturalWidth || 1;this.naturalHeight=event.target.naturalHeight || 1;this.loading=false;this.measure();}
 onError(){this.loading=false;this.failed=true;}
 changeZoom(step:number){this.zoom=Math.max(1,Math.min(5,Math.round((this.zoom+step)*10)/10));}
 rotate(step:number){this.rotation=(this.rotation+step+360)%360;}
 reset(){this.zoom=1;this.rotation=0;this.measure();}
 filterPdf(){this.pdfOnly=!this.pdfOnly;this.index=0;this.select();}
 toggleExpanded(){this.expanded=!this.expanded;}
 @HostListener('window:resize') measure(){if(this.viewport){this.availableWidth=this.viewport.nativeElement.clientWidth;}}
 @HostListener('document:keydown.escape') exitExpanded(){this.expanded=false;}
 private release(){if(this.blobUrl){URL.revokeObjectURL(this.blobUrl);this.blobUrl='';}}
 ngOnDestroy(){this.release();}
}

import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Api } from './Api';

@Pipe({name:'image'})
export class ImagePipe implements PipeTransform {
 private readonly placeholder='assets/images/avatar-placeholder.svg';
 constructor(private api:Api,private http:HttpClient){}
 transform(url:string):Observable<string>{
  if(!url){return of(this.placeholder);}
  return this.http.get(url,{responseType:'blob',headers:{Authorization:'Bearer '+this.api.getToken()}}).pipe(
   switchMap(blob=>new Observable<string>(observer=>{
    const reader=new FileReader();
    reader.onload=()=>{observer.next(reader.result as string);observer.complete();};
    reader.onerror=()=>observer.error(reader.error);
    reader.readAsDataURL(blob);
    return ()=>{if(reader.readyState===FileReader.LOADING){reader.abort();}};
   })),
   catchError(()=>of(this.placeholder))
  );
 }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Api } from './Api';
@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  constructor(private api:Api,private http:HttpClient){

  }
  transform(url: string) {

    return new Observable<string>((observer) => {
      // This is a tiny blank image
     // observer.next('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');

      // The next and error callbacks from the observer
      const {next, error} = observer;
  
      this.http.get(url, {responseType: 'blob',headers:{Authorization:'Bearer '+this.api.getToken()}}).subscribe(response => {
        const reader:any = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = function() {
          observer.next(reader.result);
        };
      });

      return {unsubscribe() {  }};
    });
  }

}

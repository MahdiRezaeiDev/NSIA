import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class Api {
  public endpoint="http://127.0.0.1:8088/api";
  public processing:boolean=false;
  public lang={selected:'fa'};
  constructor(private http: HttpClient,public translateService:TranslateService) { 
    if(localStorage && localStorage.hasOwnProperty('language')){
      this.setLang(localStorage.language);
    }else{
      this.setLang('fa');
    }
  }

  public process(action:String,data:any,type:String="post"){
        if(type == 'post'){
            return this.http.post( this.getUrl(action) ,data );
        }

        return this.http.get( this.getUrl(action) ,data );
  }

  public getUrl(action){
      return this.endpoint+action;
  }





  setLang(code){
      localStorage['language'] = code;
      this.translateService.use(code);
      this.lang.selected = code;
 
  }
}


// http://127.0.0.1:8000/api
  // public endpoint="https://servicesapi.nsia.gov.af/api";

import { Component ,OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { Compiler } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'forms';
  constructor(public location:Location,private _compiler: Compiler){
    this._compiler.clearCache();
  }


  ngOnInit(){
    jQuery(function () {        
      $(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
        $(this).closest(".select2-container").siblings('select:enabled').select2('open');
      });
    });
  }


}

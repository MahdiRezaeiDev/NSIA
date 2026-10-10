import { Component, OnInit } from '@angular/core';
import {Api} from "../services/Api"
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.css']
})
export class LanguageSelectionComponent implements OnInit {
  constructor(public api:Api,private router:Router) { }
  ngOnInit() {
  }

  selectLanguage(lang){
    this.api.setLang(lang);
    this.router.navigateByUrl("/home");
  }
}

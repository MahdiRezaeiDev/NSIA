import { Component, OnInit, Input } from '@angular/core';
import { Api } from '../Api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-drop-down',
  templateUrl: './user-drop-down.component.html',
  styleUrls: ['./user-drop-down.component.css']
})
export class UserDropDownComponent implements OnInit {
  @Input() user:any;
  constructor(private api:Api,private router:Router) { 

  }

  ngOnInit() {
  }

  get roleName(): string {
    const names = { admin: 'مدیر سیستم', team_leader: 'مسؤول تیم', center_manager: 'مدیر مرکز', audit: 'بررسی‌کننده', id_verifier: 'مسؤول تثبیت هویت' };
    return names[this.user.role] || this.user.role_dari || 'کارمند مرکز';
  }

  logout(){
    this.api.logout();
    this.router.navigateByUrl("/");
  }

  changePassword(){
    console.log('Changing password');
    this.router.navigateByUrl("/changePassword");
  }
}

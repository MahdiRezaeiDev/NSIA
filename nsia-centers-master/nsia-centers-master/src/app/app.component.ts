import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from './Api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public api: Api, private router: Router) {}

  get canManage(): boolean {
    return !!this.api.userDetails &&
      ['admin', 'team_leader', 'center_manager'].indexOf(this.api.userDetails.role) !== -1;
  }

  get pageTitle(): string {
    const route = this.router.url.split('?')[0];
    if (route === '/admin-dashboard') { return 'نمای کلی مراکز'; }
    if (route === '/dashboard') { return 'درخواستی‌ها'; }
    if (route === '/changePassword') { return 'تغییر رمز عبور'; }
    if (route.indexOf('report') !== -1) { return 'راپورها'; }
    return 'معلومات درخواستی';
  }
}

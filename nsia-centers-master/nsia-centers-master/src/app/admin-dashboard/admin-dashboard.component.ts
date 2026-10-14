import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, map, takeUntil, timeout } from 'rxjs/operators';
import { Api } from '../Api';

interface StatusReport {
  status: number | string;
  status_text: string;
  total_family: number;
  total_individual: number;
}
interface CenterReport {
  id: number;
  name: string;
  todayApplications: StatusReport[];
  oldApplications: StatusReport[];
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  centers: CenterReport[];
  loading = false;
  errorMessage = '';
  summary = { familiesToday: 0, individualsToday: 0, individualsOther: 0 };
  readonly placeholders = [0, 1, 2, 3];
  readonly periods = [
    { key: 'todayApplications', title: 'درخواستی‌های امروز', description: 'تاریخ مراجعه: امروز', icon: 'fa-calendar-day', empty: 'برای امروز درخواستی ثبت نشده است.' },
    { key: 'oldApplications', title: 'درخواستی‌های سایر روزها', description: 'تاریخ‌های پیش از امروز و پس از امروز', icon: 'fa-calendar-alt', empty: 'برای سایر روزها درخواستی ثبت نشده است.' }
  ];
  private destroyed = new Subject<void>();
  private numberFormat = new Intl.NumberFormat('fa-AF');

  constructor(public api: Api, private router: Router) {}

  ngOnInit() { this.getDashboard(); }

  getDashboard() {
    if (this.loading) { return; }
    this.loading = true;
    this.errorMessage = '';
    this.api.process('/getDashboard', {}, 'GET').pipe(
      timeout(30000),
      map((res: any) => {
        if (!Array.isArray(res)) { throw new Error('Invalid dashboard response'); }
        return res as CenterReport[];
      }),
      takeUntil(this.destroyed),
      finalize(() => { this.loading = false; })
    ).subscribe(centers => {
      this.centers = centers;
      this.summary = centers.reduce((totals, center) => {
        center.todayApplications.forEach(row => {
          totals.familiesToday += Number(row.total_family) || 0;
          totals.individualsToday += Number(row.total_individual) || 0;
        });
        center.oldApplications.forEach(row => {
          totals.individualsOther += Number(row.total_individual) || 0;
        });
        return totals;
      }, { familiesToday: 0, individualsToday: 0, individualsOther: 0 });
    }, error => {
      if (error.status === 401) {
        this.api.logout();
        this.router.navigateByUrl('/login');
        return;
      }
      this.errorMessage = error.status === 403
        ? 'شما اجازۀ مشاهدهٔ این معلومات را ندارید.'
        : 'معلومات مراکز دریافت نشد. اتصال خود را بررسی کرده و دوباره کوشش کنید.';
    });
  }

  number(value: number): string { return this.numberFormat.format(Number(value) || 0); }
  trackCenter(index: number, center: CenterReport): number { return center.id; }
  trackStatus(index: number, row: StatusReport): number | string { return row.status; }

  ngOnDestroy() { this.destroyed.next(); this.destroyed.complete(); }
}

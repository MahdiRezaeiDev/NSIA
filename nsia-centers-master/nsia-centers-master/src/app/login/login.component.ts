import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil, timeout } from 'rxjs/operators';
import { Api } from '../Api';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('emailInput', { static: false }) emailInput: ElementRef;
  @ViewChild('passwordInput', { static: false }) passwordInput: ElementRef;

  form: FormGroup;
  forgetPasswordLink: string;
  visible = false;
  checkingSession = false;
  submitting = false;
  submitted = false;
  errorMessage = '';
  private destroyed = new Subject<void>();

  constructor(private router: Router, private fb: FormBuilder,
              private cd: ChangeDetectorRef, private api: Api) {
    this.forgetPasswordLink = this.api.endpoint.replace(/\/api\/?$/, '/password/reset');
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // New visitors can use the form immediately; only existing sessions need checking.
    if (!this.api.isLoggedIn()) {
      return;
    }
    this.checkingSession = true;
    this.api.process('/isLoggedIn', {}, 'GET').pipe(
      timeout(30000),
      takeUntil(this.destroyed),
      finalize(() => {
        this.checkingSession = false;
        this.cd.markForCheck();
      })
    ).subscribe(() => this.openDashboard(), () => {
      this.api.logout();
    });
  }

  fieldInvalid(name: string): boolean {
    const control = this.form.get(name);
    return control.invalid && (control.touched || this.submitted);
  }

  login() {
    if (this.submitting || this.checkingSession) {
      return;
    }
    this.submitted = true;
    this.errorMessage = '';
    this.form.get('email').setValue((this.form.get('email').value || '').trim());
    if (this.form.invalid) {
      const input = this.form.get('email').invalid ? this.emailInput : this.passwordInput;
      if (input) { input.nativeElement.focus(); }
      return;
    }

    this.submitting = true;
    this.api.clearLocalStorageInfo();
    this.api.process('/login', this.form.value).pipe(
      timeout(30000),
      takeUntil(this.destroyed),
      finalize(() => {
        this.submitting = false;
        this.cd.markForCheck();
      })
    ).subscribe((res: any) => {
      this.api.setToken(res.token);
      this.api.setUserDetails(res.user_details);
      this.openDashboard();
    }, (error: any) => {
      this.errorMessage = this.loginError(error);
    });
  }

  private openDashboard() {
    const role = this.api.userDetails && this.api.userDetails.role;
    if (role === 'audit') {
      this.router.navigateByUrl('/audit-report');
    } else if (['admin', 'team_leader', 'center_manager'].indexOf(role) !== -1) {
      this.router.navigateByUrl('/admin-dashboard');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  private loginError(error: any): string {
    if (error.status === 0 || error.name === 'TimeoutError') {
      return 'ارتباط با سرور برقرار نشد. اتصال خود را بررسی کرده و دوباره کوشش کنید.';
    }
    if (error.status === 429) {
      return 'تعداد تلاش‌های ورود زیاد شده است. کمی بعد دوباره کوشش کنید.';
    }
    if (error.status >= 500) {
      return 'سیستم در حال حاضر پاسخ نمی‌دهد. لطفاً کمی بعد دوباره کوشش کنید.';
    }
    // Preserve specific server feedback, including restrictions on the center's IP.
    const errors = error.error && error.error.errors;
    if (Array.isArray(errors) && errors.length) {
      return errors.join(' ');
    }
    if (error.status === 401 || error.status === 403) {
      return 'ورود انجام نشد. معلومات حساب خود را بررسی کنید؛ اگر مشکل ادامه داشت با مدیر مرکز تماس بگیرید.';
    }
    return 'ورود انجام نشد. لطفاً دوباره کوشش کنید.';
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

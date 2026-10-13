@extends('layouts.auth')

@section('content')
<div class="login-layout">
    <section class="login-intro" aria-labelledby="welcome-title">
        <div class="intro-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none"><rect x="5" y="10" width="38" height="28" rx="5"/><circle cx="17" cy="21" r="4"/><path d="M10 31c1-6 13-6 14 0M29 19h8M29 25h8M29 31h5"/></svg>
        </div>
        <p class="intro-eyebrow">ادارهٔ ملی احصائیه و معلومات</p>
        <h1 id="welcome-title">به سیستم خدمات<br><span>آنلاین خوش آمدید</span></h1>
        <p class="intro-description">برای دسترسی به فورم‌ها و پیگیری درخواست‌های تذکرهٔ الکترونیکی، وارد حساب کاربری خود شوید.</p>
        <div class="intro-note"><span aria-hidden="true"></span><p>معلومات حساب کاربری خود را محرمانه نگه دارید.</p></div>
    </section>
    <section class="login-card" aria-labelledby="login-title">
        <div class="card-accent" aria-hidden="true"></div>
        <div class="card-content">
            <h2 id="login-title">ورود به حساب کاربری</h2>
            <p class="card-description">ایمیل و رمز عبور خود را وارد کنید.</p>
            @if (session('notActive'))
                <div class="auth-alert" role="alert" dir="auto">{{ session('notActive') }}</div>
            @endif
            <form id="login-form" method="POST" action="{{ route('login') }}">
                @csrf
                <div class="auth-field">
                    <label for="email">ایمیل</label>
                    <input id="email" type="email" name="email" value="{{ old('email') }}"
                        dir="ltr" placeholder="name@example.com" required autocomplete="username"
                        autocapitalize="none" spellcheck="false"
                        @if ($errors->has('email')) aria-invalid="true" aria-describedby="email-error" @endif>
                    @error('email')
                        <p class="field-error" id="email-error" role="alert" dir="auto">{{ $message }}</p>
                    @enderror
                </div>
                <div class="auth-field">
                    <label for="password">رمز عبور</label>
                    <div class="password-field">
                        <input id="password" type="password" name="password" dir="ltr" required autocomplete="current-password"
                            @if ($errors->has('password')) aria-invalid="true" aria-describedby="password-error" @endif>
                        <button class="password-toggle" id="password-toggle" type="button" hidden
                            aria-label="نمایش رمز عبور" aria-pressed="false" aria-controls="password">
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path class="eye-slash" d="m4 4 16 16"/></svg>
                        </button>
                    </div>
                    @error('password')
                        <p class="field-error" id="password-error" role="alert" dir="auto">{{ $message }}</p>
                    @enderror
                </div>
                <div class="login-options">
                    <label class="remember-label" for="remember">
                        <input type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                        <span>مرا به خاطر بسپار</span>
                    </label>
                    @if (Route::has('password.request'))
                        <a class="forgot-link" href="{{ route('password.request') }}">رمز عبور را فراموش کرده‌اید؟</a>
                    @endif
                </div>
                <button class="login-submit" type="submit">
                    <span id="submit-label">ورود به سیستم</span>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg>
                </button>
                <p class="submit-status" id="submit-status" role="status" aria-live="polite"></p>
            </form>
        </div>
        <p class="card-help">برای دریافت حساب کاربری، با مسئول سیستم تماس بگیرید.</p>
    </section>
</div>
@endsection
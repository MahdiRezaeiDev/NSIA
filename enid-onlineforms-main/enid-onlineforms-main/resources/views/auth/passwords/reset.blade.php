@extends('layouts.auth')
@section('title', 'تعیین رمز عبور تازه')
@section('form-id', 'reset-form')

@section('content')
<div class="login-layout">
    <section class="login-intro" aria-labelledby="reset-title">
        <div class="intro-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none"><rect x="10" y="21" width="28" height="21" rx="4"/><path d="M16 21v-7a8 8 0 0 1 16 0v7m-14 9 4 4 8-8"/></svg>
        </div>
        <p class="intro-eyebrow">ادارهٔ ملی احصائیه و معلومات</p>
        <h1 id="reset-title">برای حساب خود<br> <span>رمز تازه بسازید</span></h1>
        <p class="intro-description">رمزی انتخاب کنید که حدس‌زدن آن آسان نباشد. پس از ثبت، برای ورود از رمز تازه استفاده کنید.</p>
        <div class="intro-note"><span aria-hidden="true"></span><p>رمز عبور خود را با دیگران شریک نسازید.</p></div>
    </section>
    <section class="login-card" aria-labelledby="reset-form-title">
        <div class="card-accent" aria-hidden="true"></div>
        <div class="card-content">
            <h2 id="reset-form-title">تعیین رمز عبور تازه</h2>
            <p class="card-description">رمز تازه را وارد کنید و یک بار دیگر تکرار نمایید.</p>
            @error('token')
                <div class="auth-alert" role="alert">{{ $message }}</div>
            @enderror
            <form id="reset-form" data-auth-form data-submit-label="در حال ثبت…" method="POST" action="{{ route('password.update') }}">
                @csrf
                <input type="hidden" name="token" value="{{ $token }}">
                <div class="auth-field">
                    <label for="email">ایمیل حساب کاربری</label>
                    <input id="email" type="email" name="email" value="{{ old('email', $email ?? '') }}" dir="ltr"
                        required autocomplete="username" autocapitalize="none" spellcheck="false"
                        @if ($errors->has('email')) aria-invalid="true" aria-describedby="email-error" @endif>
                    @error('email')
                        <p class="field-error" id="email-error" role="alert" dir="auto">{{ $message }}</p>
                    @enderror
                </div>
                <div class="auth-field">
                    <label for="password">رمز عبور تازه</label>
                    <div class="password-field">
                        <input id="password" type="password" name="password" dir="ltr" required minlength="8"
                            autocomplete="new-password" aria-describedby="password-hint{{ $errors->has('password') ? ' password-error' : '' }}"
                            @if ($errors->has('password')) aria-invalid="true" @endif>
                        <button class="password-toggle" id="password-toggle" type="button" hidden
                            aria-label="نمایش رمز عبور" aria-pressed="false" aria-controls="password">
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path class="eye-slash" d="m4 4 16 16"/></svg>
                        </button>
                    </div>
                    <p class="field-hint" id="password-hint">دست‌کم ۸ حرف یا رقم وارد کنید.</p>
                    @error('password')
                        <p class="field-error" id="password-error" role="alert" dir="auto">{{ $message }}</p>
                    @enderror
                </div>
                <div class="auth-field">
                    <label for="password-confirm">تکرار رمز عبور تازه</label>
                    <div class="password-field">
                        <input id="password-confirm" type="password" name="password_confirmation" dir="ltr"
                            required minlength="8" autocomplete="new-password">
                        <button class="password-toggle" data-password-toggle data-password-label="تکرار رمز عبور" type="button" hidden
                            aria-label="نمایش تکرار رمز عبور" aria-pressed="false" aria-controls="password-confirm">
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path class="eye-slash" d="m4 4 16 16"/></svg>
                        </button>
                    </div>
                </div>
                <button class="login-submit" type="submit">
                    <span id="submit-label">ثبت رمز عبور تازه</span>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>
                </button>
                <p class="submit-status" id="submit-status" role="status" aria-live="polite"></p>
                <a class="auth-back" href="{{ route('login') }}">برگشت به صفحهٔ ورود</a>
            </form>
        </div>
        <p class="card-help">مهلت لینک گذشته است؟ <a href="{{ route('password.request') }}">درخواست لینک تازه</a></p>
    </section>
</div>
@endsection

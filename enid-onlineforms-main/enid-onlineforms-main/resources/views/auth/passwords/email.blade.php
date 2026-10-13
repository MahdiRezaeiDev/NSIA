@extends('layouts.auth')
@section('title', 'بازیابی رمز عبور')
@section('form-id', 'recovery-form')

@section('content')
<div class="login-layout">
    <section class="login-intro" aria-labelledby="recovery-title">
        <div class="intro-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none"><rect x="10" y="21" width="28" height="21" rx="4"/><path d="M16 21v-7a8 8 0 0 1 16 0v7M24 29v5"/><circle cx="24" cy="28" r="1"/></svg>
        </div>
        <p class="intro-eyebrow">ادارهٔ ملی احصائیه و معلومات</p>
        <h1 id="recovery-title">رمز عبور را<br> <span>بازیابی کنید</span></h1>
        <p class="intro-description">ایمیل حساب کاربری خود را وارد کنید تا لینک تعیین رمز تازه برای شما ارسال شود.</p>
        <div class="intro-note"><span aria-hidden="true"></span><p>لینک بازیابی را تنها خودتان استفاده کنید.</p></div>
    </section>
    <section class="login-card" aria-labelledby="recovery-form-title">
        <div class="card-accent" aria-hidden="true"></div>
        <div class="card-content">
            <h2 id="recovery-form-title">فراموشی رمز عبور</h2>
            <p class="card-description">برای دریافت لینک بازیابی، ایمیل خود را بنویسید.</p>
            @if (session('status'))
                <div class="auth-alert auth-success" id="recovery-success" role="status">{{ session('status') }}</div>
            @endif
            <form id="recovery-form" data-auth-form data-submit-label="در حال ارسال…" method="POST" action="{{ route('password.email') }}">
                @csrf
                <div class="auth-field">
                    <label for="email">ایمیل حساب کاربری</label>
                    <input id="email" type="email" name="email" value="{{ old('email') }}" dir="ltr"
                        placeholder="name@example.com" required autocomplete="email" autocapitalize="none" spellcheck="false"
                        @if ($errors->has('email')) aria-invalid="true" aria-describedby="email-error" @endif>
                    @error('email')
                        <p class="field-error" id="email-error" role="alert" dir="auto">{{ $message }}</p>
                    @enderror
                </div>
                <button class="login-submit" type="submit">
                    <span id="submit-label">ارسال لینک بازیابی</span>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg>
                </button>
                <p class="submit-status" id="submit-status" role="status" aria-live="polite"></p>
                <a class="auth-back" href="{{ route('login') }}">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
                    برگشت به صفحهٔ ورود
                </a>
            </form>
        </div>
        <p class="card-help">اگر به ایمیل حساب دسترسی ندارید، با مسئول سیستم تماس بگیرید.</p>
    </section>
</div>
@endsection
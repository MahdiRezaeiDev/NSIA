@extends('layouts.admin')
@section('title', 'محیط کاری شما')
@section('description', 'درخواستی‌های مربوط به وظیفهٔ خود را بررسی و پیگیری کنید.')
@section('actions')<a class="btn btn-primary" href="/individual-applications">@include('elements.icon', ['name'=>'file']) مشاهدهٔ درخواستی‌ها</a>@endsection
@section('content')
<div class="dashboard-grid">
    <section class="panel"><div class="section-head"><h2>درخواستی‌های قابل بررسی</h2></div><div class="panel-body"><span class="metric-icon">@include('elements.icon', ['name'=>'file'])</span><div class="metric-number my-3">{{ number_format($individualApplicationsCount) }}</div><p class="muted">شمار متقاضیان در مراحل مربوط به وظیفه و مرکز شما.</p><a href="/individual-applications" class="text-link">رفتن به لست درخواستی‌ها @include('elements.icon', ['name'=>'arrow'])</a></div></section>
    <section class="panel"><div class="section-head"><h2>معلومات حساب</h2></div><div class="panel-body"><dl class="account-facts"><div><dt>نام کارمند</dt><dd>{{ Auth::user()->name }}</dd></div><div><dt>وظیفه</dt><dd>{{ Auth::user()->role_in_dari }}</dd></div><div style="grid-column:1/-1"><dt>ایمیل</dt><dd><bdi>{{ Auth::user()->email }}</bdi></dd></div></dl><a href="/changePasswordForm" class="text-link">تغییر رمز عبور @include('elements.icon', ['name'=>'arrow'])</a></div></section>
</div>
@endsection

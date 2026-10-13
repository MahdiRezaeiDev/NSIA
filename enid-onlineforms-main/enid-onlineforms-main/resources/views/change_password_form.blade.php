@extends('layouts.admin')
@section('title', 'تغییر رمز عبور')
@section('description', 'رمز عبور حساب خود را به‌روزرسانی کنید.')
@section('content')
<div class="form-layout" ng-controller="UsersCtrl"><form class="panel" ng-submit="changePassword()">
    @csrf
    <div class="form-section"><h2>امنیت حساب</h2><p>رمز فعلی و رمز جدید را وارد کنید.</p><div class="form-grid">
        <div class="form-field full"><label for="current-password">رمز عبور فعلی</label><div class="password-wrap"><input id="current-password" class="form-control ltr" type="password" ng-model="UserCredintial.old_password" required autocomplete="current-password"><button type="button" class="password-toggle" data-reveal-password aria-controls="current-password" aria-pressed="false">نمایش</button></div></div>
        <div class="form-field"><label for="new-password">رمز عبور جدید</label><div class="password-wrap"><input id="new-password" class="form-control ltr" type="password" ng-model="UserCredintial.new_password" required minlength="6" autocomplete="new-password" aria-describedby="password-hint"><button type="button" class="password-toggle" data-reveal-password aria-controls="new-password" aria-pressed="false">نمایش</button></div><small class="hint" id="password-hint">حداقل ۶ حرف و متفاوت از رمز فعلی.</small></div>
        <div class="form-field"><label for="confirm-password">تأیید رمز عبور جدید</label><input id="confirm-password" class="form-control ltr" type="password" ng-model="UserCredintial.new_password_confirmation" required autocomplete="new-password"></div>
    </div></div>
    <div class="feedback error" ng-if="hasErrors(errors)" role="alert" ng-cloak><p ng-repeat="error in errors">[[error.join ? error.join('، ') : error]]</p></div><div class="feedback success" ng-if="passwordChanged" role="status" ng-cloak>رمز عبور شما با موفقیت تغییر کرد.</div>
    <div class="form-actions"><button type="submit" class="btn btn-primary" ng-disabled="saving">@include('elements.icon', ['name'=>'lock']) [[saving ? 'در حال ثبت…' : 'ثبت رمز جدید']]</button><a class="btn btn-secondary" href="{{Auth::user()->role == 'admin' ? '/home' : '/userDashboard'}}">برگشت</a></div>
</form><aside class="form-aside">@include('elements.icon', ['name'=>'shield'])<h2>حفاظت از حساب</h2><p>از رمز متفاوت برای این حساب استفاده کنید. رمز عبور خود را با دیگران شریک نسازید.</p></aside></div>
@endsection

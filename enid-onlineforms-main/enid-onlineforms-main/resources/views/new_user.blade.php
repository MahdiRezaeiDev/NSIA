@extends('layouts.admin')
@section('title', isset($user->id) ? 'ویرایش معلومات کارمند' : 'افزودن کارمند')
@section('description', 'معلومات حساب، وظیفه و مرکز کاری کارمند را مشخص کنید.')
@section('actions')<a href="/admin/users" class="btn btn-secondary">برگشت به کارمندان @include('elements.icon', ['name'=>'arrow'])</a>@endsection
@section('content')
<div class="form-layout" ng-controller="UsersCtrl" ng-init="Center.getCenters('all'); @if(isset($user->id)) setUser({{$user->toJson()}}) @else setUser({active:1}) @endif">
    <form class="panel" ng-submit="saveUser()">
        @csrf
        <div class="form-section"><h2>معلومات شخصی</h2><p>نام و ایمیل برای شناسایی و ورود به حساب استفاده می‌شود.</p><div class="form-grid">
            <div class="form-field"><label for="user-name">نام مکمل <span class="required">*</span></label><input id="user-name" class="form-control" name="name" ng-model="User.name" required autocomplete="name" placeholder="نام و تخلص کارمند"></div>
            <div class="form-field"><label for="user-email">ایمیل <span class="required">*</span></label><input id="user-email" class="form-control ltr" name="email" type="email" ng-model="User.email" required autocomplete="email" placeholder="name@example.com"></div>
        </div></div>
        <div class="form-section"><h2>وظیفه و دسترسی</h2><p>صلاحیت کارمند بر اساس وظیفه و مرکز انتخاب‌شده تعیین می‌شود.</p><div class="form-grid">
            <div class="form-field"><label for="user-role">وظیفه <span class="required">*</span></label><select class="form-control" id="user-role" ng-model="User.role" required><option value="">انتخاب وظیفه</option ng-repeat="(value,label) in roleLabels" value="[[value]]">[[label]]</option></select></div>
            <div class="form-field"><label for="user-center">مرکز کاری <span class="required" ng-if="User.role !== 'admin'">*</span></label><select id="user-center" class="form-control" ng-model="User.center_id" ng-options="center.id as center.name for center in Center.tableOptions.data" ng-required="User.role !== 'admin'"><option value="">انتخاب مرکز</option></select></div>
            <div class="form-field full"><span class="field-label" id="account-status-label">حالت حساب</span><div class="choice-group" role="group" aria-labelledby="account-status-label"><label for="account-active"><input type="radio" id="account-active" name="active" ng-model="User.active" ng-value="1">فعال</label><label for="account-inactive"><input type="radio" id="account-inactive" name="active" ng-model="User.active" ng-value="0">غیرفعال</label></div></div>
        </div></div>
        <div class="form-section"><h2>رمز عبور</h2><p>@if(isset($user->id)) برای نگه‌داشتن رمز فعلی، این دو خانه را خالی بگذارید. @else رمز عبور را تعیین و دوباره تأیید کنید. @endif</p><div class="form-grid">
            <div class="form-field"><label for="user-password">رمز عبور</label><div class="password-wrap"><input id="user-password" type="password" class="form-control ltr" ng-model="User.password" autocomplete="new-password" @if(!isset($user->id)) required @endif><button type="button" class="password-toggle" data-reveal-password aria-controls="user-password" aria-pressed="false">نمایش</button></div></div>
            <div class="form-field"><label for="user-password-confirm">تأیید رمز عبور</label><input id="user-password-confirm" type="password" class="form-control ltr" ng-model="User.password_confirmation" autocomplete="new-password" ng-required="!!User.password"></div>
        </div></div>
        <div class="feedback error" ng-if="errors.length || hasErrors(errors)" role="alert" ng-cloak><p ng-repeat="error in errors">[[error.join ? error.join('، ') : error]]</p></div>
        <div class="form-actions"><button class="btn btn-primary" type="submit" ng-disabled="saving">@include('elements.icon', ['name'=>'check']) [[saving ? 'در حال ثبت…' : 'ثبت معلومات']]</button><a href="/admin/users" class="btn btn-secondary">انصراف</a><span class="hint">خانه‌های ستاره‌دار ضروری است.</span></div>
    </form>
    <aside class="form-aside">@include('elements.icon', ['name'=>'shield'])<h2>حساب کارمند</h2><p>هر کارمند با ایمیل و رمز عبور خود وارد سیستم می‌شود. حالت غیرفعال، ورود این حساب را متوقف می‌سازد.</p></aside>
</div>
@endsection

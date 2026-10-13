@extends('layouts.admin')
@section('title', $template ? 'ویرایش قالب ملاقات' : 'قالب جدید ملاقات')
@section('description', 'یک تقسیم اوقات قابل استفاده برای مراکز توزیع تنظیم کنید.')
@section('actions')<a href="/admin/templates" class="btn btn-secondary">برگشت به قالب‌ها @include('elements.icon', ['name'=>'arrow'])</a>@endsection
@section('content')
<div class="editor-layout">
<form class="panel editor-card" focus-errors="errors" ng-controller="AppointmentsCtrl" ng-init="setTimes({{$times->toJson()}}); @if($template) setTemplate({{$template->toJson()}}) @endif" ng-submit="saveTemplate()">
    @csrf
    @include('elements.editor-record', ['recordIcon'=>'calendar', 'recordLabel'=>'تقسیم اوقات مراکز', 'recordTitle'=>$template ? $template->name : 'قالب جدید ملاقات'])
    <section class="editor-section" id="template-details"><header class="editor-section-heading"><span class="editor-step" aria-hidden="true">۰۱</span><h3>معلومات قالب</h3><p>نام واضح برای شناسایی تقسیم اوقات.</p></header><div class="editor-fields"><div class="form-field compact-form"><label for="template-name">نام قالب <span class="required">*</span></label><input id="template-name" class="form-control" ng-model="model.name" required placeholder="مثلاً اوقات کاری مرکز کابل" aria-describedby="template-name-error" ng-attr-aria-invalid="[[!!errors.name]]">@include('elements.field-error', ['errorId'=>'template-name-error', 'errorExpression'=>'errors.name'])</div></div></section>
    <section class="editor-section editor-section-wide" id="template-schedule"><header class="editor-section-heading"><span class="editor-step" aria-hidden="true">۰۲</span><h3>روزها و اوقات کاری</h3><p>روزهای فعال و تعداد ملاقات در هر فاصلهٔ زمانی.</p></header><div class="editor-fields">@include('appointment')</div></section>
    <div class="feedback error" ng-if="hasErrors(errors)" role="alert" ng-cloak><p ng-repeat="error in errors">[[error.join ? error.join('، ') : error]]</p></div>
    <div class="form-actions" id="template-save"><button type="submit" class="btn btn-primary" ng-disabled="saving">@include('elements.icon', ['name'=>'check']) [[saving ? 'در حال ثبت…' : 'ثبت قالب']]</button><a class="btn btn-secondary" href="/admin/templates">انصراف</a></div>
</form><aside class="editor-aside"><p class="editor-aside-label">بخش‌های فورم</p><nav aria-label="بخش‌های فورم"><a href="#template-details"><span>۰۱</span>معلومات قالب</a><a href="#template-schedule"><span>۰۲</span>اوقات و رخصتی‌ها</a><a href="#template-save"><span>✓</span>ثبت قالب</a></nav><div class="editor-guidance">@include('elements.icon', ['name'=>'shield'])<h3>ظرفیت ملاقات</h3><p>ظرفیت هر فاصلهٔ زمانی را متناسب با توان پذیرش مرکز تعیین کنید.</p></div></aside></div>
@endsection

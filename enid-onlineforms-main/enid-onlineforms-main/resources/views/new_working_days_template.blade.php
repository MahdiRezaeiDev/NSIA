@extends('layouts.admin')
@section('title', $template ? 'ویرایش قالب ملاقات' : 'قالب جدید ملاقات')
@section('description', 'یک تقسیم اوقات قابل استفاده برای مراکز توزیع تنظیم کنید.')
@section('actions')<a href="/admin/templates" class="btn btn-secondary">برگشت به قالب‌ها @include('elements.icon', ['name'=>'arrow'])</a>@endsection
@section('content')
<form class="panel" ng-controller="AppointmentsCtrl" ng-init="setTimes({{$times->toJson()}}); @if($template) setTemplate({{$template->toJson()}}) @endif" ng-submit="saveTemplate()">
    @csrf
    <div class="form-section"><h2>معلومات قالب</h2><p>برای شناسایی آسان، نام واضحی برای این تقسیم اوقات انتخاب کنید.</p><div class="form-field compact-form"><label for="template-name">نام قالب <span class="required">*</span></label><input id="template-name" class="form-control" ng-model="model.name" required placeholder="مثلاً اوقات کاری مرکز کابل"></div></div>
    <div class="form-section"><h2>روزها و اوقات کاری</h2><p>روزهای فعال و تعداد ملاقات در هر فاصلهٔ زمانی.</p>@include('appointment')</div>
    <div class="feedback error" ng-if="hasErrors(errors)" role="alert" ng-cloak><p ng-repeat="error in errors">[[error.join ? error.join('، ') : error]]</p></div>
    <div class="form-actions"><button type="submit" class="btn btn-primary" ng-disabled="saving">@include('elements.icon', ['name'=>'check']) [[saving ? 'در حال ثبت…' : 'ثبت قالب']]</button><a class="btn btn-secondary" href="/admin/templates">انصراف</a></div>
</form>
@endsection

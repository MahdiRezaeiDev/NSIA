@extends('layouts.admin')
@section('title', isset($center->id) ? 'ویرایش مرکز' : 'افزودن مرکز')
@section('description', 'مشخصات مرکز، فیس و اوقات پذیرش متقاضیان را تنظیم کنید.')
@section('actions')<a href="/admin/centers" class="btn btn-secondary">برگشت به مراکز @include('elements.icon', ['name'=>'arrow'])</a>@endsection
@section('content')
<div ng-controller="AppointmentsCtrl" ng-init="setTimes({{$times->toJson()}}); @if(isset($center->id)) setTemplate({{json_encode($center->appointments)}}); @endif">
<form class="panel" ng-controller="UsersCtrl" ng-init="@if(isset($center->id)) Center.setCenter({{$center->toJson()}}) @endif" ng-submit="Center.save(model)">
    @csrf
    <div class="form-section"><h2>مشخصات مرکز</h2><p>نام و موقعیت مرکز توزیع تذکره.</p><div class="form-grid">
        <div class="form-field"><label for="center-name">نام مرکز <span class="required">*</span></label><input id="center-name" class="form-control" ng-model="Center.model.name" required></div>
        <div class="form-field"><label for="center-country">کشور</label><select id="center-country" class="form-control" ng-model="Center.model.country">@foreach(\App\Village::getCountries() as $country)<option value="{{$country->id}}">{{$country->text}}</option>@endforeach</select></div>
        <div class="form-field"><label for="center-province">ولایت / شهر <span class="required">*</span></label><input id="center-province" class="form-control" ng-model="Center.model.province" required></div>
        <div class="form-field"><label for="center-town">ولسوالی</label><input id="center-town" class="form-control" ng-model="Center.model.town"></div>
        <div class="form-field"><label for="center-village">قریه / ناحیه</label><input id="center-village" class="form-control" ng-model="Center.model.village"></div>
        <div class="form-field"><span class="field-label" id="center-status-label">حالت مرکز</span><div class="choice-group" role="group" aria-labelledby="center-status-label"><label for="center-active"><input id="center-active" name="status" type="radio" ng-model="Center.model.status" ng-value="1">فعال</label><label for="center-inactive"><input id="center-inactive" name="status" type="radio" ng-model="Center.model.status" ng-value="0">غیرفعال</label></div></div>
    </div></div>
    <div class="form-section"><h2>تنظیمات خدمات</h2><p>فیس، دسترسی کارمندان و شرایط ملاقات.</p><div class="form-grid">
        <div class="form-field"><label for="center-fee">فیس <span class="required">*</span></label><input id="center-fee" class="form-control" inputmode="decimal" ng-model="Center.model.fee" required></div>
        <div class="form-field"><label for="center-currency">واحد پولی <span class="required">*</span></label><input id="center-currency" class="form-control" ng-model="Center.model.currency" required placeholder="مثلاً افغانی"></div>
        <div class="form-field"><label for="center-ip">آدرس آی‌پی مرکز <span class="required">*</span></label><input id="center-ip" class="form-control ltr" ng-model="Center.model.ip" required placeholder="192.168.1.1" aria-describedby="ip-hint"><small class="hint" id="ip-hint">آدرس مجاز برای دسترسی کارمندان این مرکز.</small></div>
        <div class="form-field"><label for="center-days">فاصله تا نخستین روز ملاقات</label><input id="center-days" class="form-control" type="number" min="1" step="1" ng-model="Center.model.number_of_days_before_appointment"><small class="hint">تعداد روز پس از ثبت درخواستی.</small></div>
        <div class="form-field full"><span class="field-label" id="appointment-required-label">تعیین وقت ملاقات ضروری است؟</span><div class="choice-group" role="group" aria-labelledby="appointment-required-label"><label for="appointments-on"><input id="appointments-on" name="enable_appointments" type="radio" ng-value="1" ng-model="Center.model.enable_appointments">بلی</label><label for="appointments-off"><input id="appointments-off" name="enable_appointments" type="radio" ng-value="0" ng-model="Center.model.enable_appointments">نخیر</label></div></div>
    </div></div>
    <div class="form-section"><h2>اوقات ملاقات</h2><p>روزهای کاری و ظرفیت هر فاصلهٔ زمانی را مشخص کنید.</p><div class="form-field compact-form"><label for="center-template">استفاده از قالب موجود</label><select id="center-template" class="form-control" ng-model="selectedTemplate" ng-change="setTemplate(selectedTemplate)"><option value="">انتخاب قالب</option>@foreach($templates as $template)<option value="{{$template->toJson()}}">{{$template->name}}</option>@endforeach</select><small class="hint">انتخاب قالب، اوقات و رخصتی‌های این فورم را جایگزین می‌کند.</small></div>
        @include('appointment')
    </div>
    <div class="feedback error" ng-if="hasErrors(Center.errors)" role="alert" ng-cloak><p ng-repeat="error in Center.errors">[[error.join ? error.join('، ') : error]]</p></div>
    <div class="form-actions"><button type="submit" class="btn btn-primary" ng-disabled="Center.saving">@include('elements.icon', ['name'=>'check']) [[Center.saving ? 'در حال ثبت…' : 'ثبت معلومات مرکز']]</button><a class="btn btn-secondary" href="/admin/centers">انصراف</a><span class="hint">خانه‌های ستاره‌دار ضروری است.</span></div>
</form></div>
@endsection

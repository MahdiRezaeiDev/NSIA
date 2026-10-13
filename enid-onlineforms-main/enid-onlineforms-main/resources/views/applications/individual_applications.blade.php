@extends('layouts.admin')
@section('title', 'درخواستی‌ها')
@section('description', 'جستجو و پیگیری درخواستی‌های فامیلی و بررسی معلومات هر متقاضی.')
@section('content')
@php
$centers = Auth::user()->role == 'admin' ? \App\Center::orderBy('name')->get(['id','name']) : (Auth::user()->role == 'center_manager' ? \App\Center::whereBetween('id', [14,88])->get(['id','name']) : \App\Center::where('id',Auth::user()->center_id)->get(['id','name']));
$statuses = collect(Auth::user()->role == 'admin' ? [0,1,2,3,4,5,6,13,14,15] : Auth::user()->getApplicationAccessStatus())->mapWithKeys(function($status) { return [$status => \App\Individualform::getStatusDescription($status)]; });
@endphp
<section class="panel" ng-controller="PanelListCtrl" ng-init="init('applications', {{$params}}, {{$centers->toJson()}}, {{$statuses->toJson()}})">
    <div class="toolbar"><form class="search-form" ng-submit="load(1)"><div class="search-field">@include('elements.icon', ['name'=>'search'])<input class="form-control" type="search" ng-model="filters.q" aria-label="جستجوی درخواستی" placeholder="نمبر درخواستی، نام یا تخلص"></div><button type="submit" class="btn btn-primary" ng-disabled="loading">جستجو</button></form><span class="toolbar-note" ng-cloak>[[pager.total | number]] درخواستی فامیلی</span></div>
    <div class="toolbar">
        <div class="form-field"><label for="status-filter">حالت درخواستی</label><select class="form-control" id="status-filter" ng-model="filters.status" ng-change="load(1)"><option value="">تمام حالت‌ها</option ng-repeat="(value,label) in statusLabels" value="[[value]]">[[label]]</option></select></div>
        @if(Auth::user()->role == 'admin')<div class="form-field"><label for="center-filter">مرکز توزیع</label><select class="form-control" id="center-filter" ng-model="filters.center_id" ng-change="load(1)"><option value="">تمام مراکز</option ng-repeat="center in centers" value="[[center.id]]">[[center.name]]</option></select></div>@endif
        <button class="btn btn-secondary" type="button" ng-click="date.enabled=!date.enabled; !date.enabled && load(1)" ng-attr-aria-expanded="[[!!date.enabled]]" aria-controls="appointment-filter">@include('elements.icon', ['name'=>'calendar']) تاریخ ملاقات</button>
        <button class="btn btn-secondary" type="button" ng-click="resetFilters()">پاک‌کردن فلترها</button>
    </div>
    <form class="date-filter" id="appointment-filter" ng-show="date.enabled" ng-submit="load(1)" ng-cloak>
        <div class="form-field"><label for="appointment-day">روز</label><input id="appointment-day" class="form-control" type="number" min="1" max="31" ng-model="date.day" required></div><div class="form-field"><label for="appointment-month">ماه</label><input id="appointment-month" class="form-control" type="number" min="1" max="12" ng-model="date.month" required></div><div class="form-field"><label for="appointment-year">سال هجری شمسی</label><input id="appointment-year" class="form-control" type="number" min="1300" max="1600" ng-model="date.year" required></div><button class="btn btn-primary" type="submit" ng-disabled="loading">اعمال تاریخ</button>
    </form>
    @include('elements.list-feedback')
    <div class="table-wrap" role="region" aria-label="لست درخواستی‌ها" tabindex="0"><table class="data-table"><thead><tr><th scope="col">نمبر فامیلی</th><th scope="col">متقاضی</th><th scope="col">مرکز</th><th scope="col">ملاقات / نوبت</th><th scope="col">اعضا</th><th scope="col">حالت</th><th scope="col"></th></tr></thead><tbody ng-cloak><tr ng-repeat="row in rows track by row.family_form_reference_no"><td><bdi>[[row.family_form_reference_no]]</bdi></td><td><strong class="cell-title">[[row.name]] [[row.surname]]</strong><span class="cell-subtitle">ولد [[row.father_name]]</span></td><td class="wrap-cell">[[centerName(row.center_id)]]</td><td><bdi>[[row.appointment_date || '—']]</bdi><span class="cell-subtitle">نوبت: [[row.queue_no || '—']]</span></td><td>[[row.total_applicants]]</td><td><span class="badge-status" ng-class="{'danger':+row.status === 13, 'warning':+row.status === 0}">[[statusLabels[row.status] || 'مرحلهٔ '+row.status]]</span><span class="cell-subtitle" ng-if="row.opened">زیر کار: [[row.opened_by]]</span></td><td><a class="btn btn-secondary btn-sm" ng-href="/viewIndividualApplication?reference_no=[[row.reference_no]]" aria-label="بررسی درخواستی [[row.family_form_reference_no]]">بررسی @include('elements.icon', ['name'=>'arrow'])</a></td></tr><tr ng-if="!loading && !error && !rows.length"><td colspan="7" class="empty-cell">درخواستی یافت نشد. نام، نمبر یا فلترها را بررسی کنید.</td></tr></tbody></table></div>
    @include('elements.pagination')
</section>
@endsection

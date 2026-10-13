@extends('layouts.admin')
@section('title', 'مراکز توزیع')
@section('description', 'معلومات مراکز، وضعیت فعالیت و تنظیمات پذیرش متقاضیان.')
@section('actions')<a class="btn btn-primary" href="/admin/newCenter">@include('elements.icon', ['name'=>'plus']) مرکز جدید</a>@endsection
@section('content')
<section class="panel" ng-controller="PanelListCtrl" ng-init="init('centers')" aria-label="مراکز توزیع">
    <div class="toolbar"><form class="search-form" ng-submit="load(1)"><div class="search-field">@include('elements.icon', ['name'=>'search'])<input class="form-control" type="search" ng-model="filters.q" aria-label="جستجو به نام مرکز یا موقعیت" placeholder="جستجو به نام مرکز یا موقعیت"></div><button type="submit" class="btn btn-primary" ng-disabled="loading">جستجو</button></form><span class="toolbar-note" ng-cloak>[[pager.total | number]] مرکز</span></div>
    @include('elements.list-feedback')
    <div class="table-wrap" role="region" aria-label="لست مراکز توزیع" tabindex="0"><table class="data-table mobile-cards"><thead><tr><th scope="col">نام مرکز</th><th scope="col">ولایت / شهر</th><th scope="col">ولسوالی</th><th scope="col">حالت</th><th scope="col">ملاقات</th><th scope="col"></th></tr></thead><tbody ng-cloak><tr ng-repeat="row in rows track by row.id"><td class="mobile-title" data-label="نام مرکز"><div class="person-cell"><span class="row-avatar">@include('elements.icon', ['name'=>'building'])</span><div><strong class="cell-title">[[row.name]]</strong><span class="cell-subtitle">[[row.village || '—']]</span></div></div></td><td data-label="ولایت / شهر">[[row.province || '—']]</td><td data-label="ولسوالی">[[row.town || '—']]</td><td data-label="حالت"><span class="badge-status" ng-class="{'inactive':!+row.status}">[[+row.status ? 'فعال' : 'غیرفعال']]</span></td><td data-label="ملاقات"><span class="muted">[[+row.enable_appointments ? 'با تعیین وقت' : 'بدون تعیین وقت']]</span></td><td class="mobile-actions" data-label=""><a class="btn btn-secondary btn-sm" ng-href="/admin/newCenter?id=[[row.id]]" aria-label="ویرایش [[row.name]]">@include('elements.icon', ['name'=>'edit']) ویرایش</a></td></tr><tr ng-if="!loading && !error && !rows.length"><td class="empty-cell" colspan="6">موردی یافت نشد. عبارت جستجو را تغییر دهید.</td></tr></tbody></table></div>
    @include('elements.pagination')
</section>
@endsection

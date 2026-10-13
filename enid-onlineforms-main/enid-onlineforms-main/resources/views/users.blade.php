@extends('layouts.admin')
@section('title', 'کارمندان')
@section('description', 'مدیریت حساب کارمندان، وظایف و دسترسی به مراکز.')
@section('actions')<a class="btn btn-primary" href="/admin/newUser">@include('elements.icon', ['name'=>'plus']) کارمند جدید</a>@endsection
@section('content')
<section class="panel" ng-controller="PanelListCtrl" ng-init="init('users')" aria-label="کارمندان">
    <div class="toolbar"><form class="search-form" ng-submit="load(1)"><div class="search-field">@include('elements.icon', ['name'=>'search'])<input class="form-control" type="search" ng-model="filters.q" aria-label="جستجو به نام، ایمیل یا وظیفه" placeholder="جستجو به نام، ایمیل یا وظیفه"></div><button type="submit" class="btn btn-primary" ng-disabled="loading">جستجو</button></form><span class="toolbar-note" ng-cloak>[[pager.total | number]] کارمند</span></div>
    @include('elements.list-feedback')
    <div class="table-wrap" role="region" aria-label="لست کارمندان" tabindex="0"><table class="data-table mobile-cards"><thead><tr><th scope="col">نام کارمند</th><th scope="col">ایمیل</th><th scope="col">وظیفه</th><th scope="col">حالت</th><th scope="col"></th></tr></thead><tbody ng-cloak><tr ng-repeat="row in rows track by row.id"><td class="mobile-title" data-label="نام کارمند"><div class="person-cell"><span class="row-avatar" aria-hidden="true">[[row.name.charAt(0)]]</span><strong class="cell-title">[[row.name]]</strong></div></td><td class="mobile-wide" data-label="ایمیل"><bdi>[[row.email]]</bdi></td><td data-label="وظیفه">[[roleLabels[row.role] || row.roleInDari || row.role]]</td><td data-label="حالت"><span class="badge-status" ng-class="{'inactive':!+row.active}">[[+row.active ? 'فعال' : 'غیرفعال']]</span></td><td class="mobile-actions" data-label=""><a class="btn btn-secondary btn-sm" ng-href="/admin/newUser?id=[[row.id]]" aria-label="ویرایش [[row.name]]">@include('elements.icon', ['name'=>'edit']) ویرایش</a></td></tr><tr ng-if="!loading && !error && !rows.length"><td class="empty-cell" colspan="5">موردی یافت نشد. عبارت جستجو را تغییر دهید.</td></tr></tbody></table></div>
    @include('elements.pagination')
</section>
@endsection

@extends('layouts.admin')
@section('title', 'کارمندان')
@section('description', 'مدیریت حساب کارمندان، وظایف و دسترسی به مراکز.')
@section('actions')<a class="btn btn-primary" href="/admin/newUser">@include('elements.icon', ['name'=>'plus']) کارمند جدید</a>@endsection
@section('content')
<section class="panel" ng-controller="PanelListCtrl" ng-init="init('users')" aria-label="کارمندان">
    <div class="toolbar"><form class="search-form" ng-submit="load(1)"><div class="search-field">@include('elements.icon', ['name'=>'search'])<input class="form-control" type="search" ng-model="filters.q" aria-label="جستجو به نام، ایمیل یا وظیفه" placeholder="جستجو به نام، ایمیل یا وظیفه"></div><button type="submit" class="btn btn-primary" ng-disabled="loading">جستجو</button></form><span class="toolbar-note" ng-cloak>[[pager.total | number]] کارمند</span></div>
    @include('elements.list-feedback')
    <div class="table-wrap" role="region" aria-label="لست کارمندان" tabindex="0"><table class="data-table"><thead><tr><th scope="col">نام کارمند</th><th scope="col">ایمیل</th><th scope="col">وظیفه</th><th scope="col">حالت</th><th scope="col"></th></tr></thead><tbody ng-cloak><tr ng-repeat="row in rows track by row.id"><td><strong class="cell-title">[[row.name]]</strong></td><td><bdi>[[row.email]]</bdi></td><td>[[roleLabels[row.role] || row.roleInDari || row.role]]</td><td><span class="badge-status" ng-class="{'inactive':!+row.active}">[[+row.active ? 'فعال' : 'غیرفعال']]</span></td><td><a class="btn btn-secondary btn-sm" ng-href="/admin/newUser?id=[[row.id]]" aria-label="ویرایش [[row.name]]">@include('elements.icon', ['name'=>'edit']) ویرایش</a></td></tr><tr ng-if="!loading && !error && !rows.length"><td class="empty-cell" colspan="5">موردی یافت نشد. عبارت جستجو را تغییر دهید.</td></tr></tbody></table></div>
    @include('elements.pagination')
</section>
@endsection

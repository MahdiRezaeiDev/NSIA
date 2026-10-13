@extends('layouts.admin')
@section('title', 'اوقات ملاقات')
@section('description', 'قالب‌های روزهای کاری، ظرفیت ملاقات و رخصتی‌های عمومی مراکز.')
@section('actions')<a href="/admin/template" class="btn btn-primary">@include('elements.icon', ['name'=>'plus']) قالب جدید</a>@endsection
@section('content')
<section class="panel" ng-controller="PanelListCtrl" ng-init="init('templates')">
    <div class="toolbar"><form class="search-form" ng-submit="load(1)"><div class="search-field">@include('elements.icon', ['name'=>'search'])<input class="form-control" type="search" ng-model="filters.q" aria-label="جستجوی قالب" placeholder="جستجو به نام قالب"></div><button class="btn btn-primary" type="submit">جستجو</button></form><span class="toolbar-note" ng-hide="loading" ng-cloak>[[pager.total]] قالب</span></div>
    @include('elements.list-feedback')
    <div class="table-wrap" aria-busy="true" ng-attr-aria-busy="[[!!loading]]" role="region" aria-label="لست قالب‌ها" tabindex="0"><table class="data-table mobile-cards"><thead><tr><th scope="col">نام قالب</th><th scope="col">روزهای کاری</th><th scope="col">رخصتی‌ها</th><th scope="col">عملیات</th></tr></thead>@include('elements.skeleton-rows', ['skeletonColumns'=>['title', 'text', 'text', 'action']])<tbody ng-hide="loading" ng-cloak><tr ng-repeat="row in rows track by row.id"><td class="mobile-title wrap-cell" data-label="نام قالب"><strong class="cell-title">[[row.name]]</strong></td><td data-label="روزهای کاری">[[activeDays(row)]] روز در هفته</td><td data-label="رخصتی‌ها">[[holidayCount(row)]] روز</td><td class="mobile-actions" data-label=""><div class="application-actions"><a class="btn btn-secondary btn-sm" ng-href="/admin/template/[[row.id]]" aria-label="ویرایش [[row.name]]">@include('elements.icon', ['name'=>'edit']) ویرایش</a><button class="btn btn-danger btn-sm" type="button" ng-click="removeTemplate(row)" ng-disabled="loading" aria-label="حذف [[row.name]]">@include('elements.icon', ['name'=>'trash']) حذف</button></div></td></tr><tr ng-if="!loading && !error && !rows.length"><td colspan="4" class="empty-cell">قالبی یافت نشد.</td></tr></tbody></table></div>
    @include('elements.pagination')
</section>
@endsection

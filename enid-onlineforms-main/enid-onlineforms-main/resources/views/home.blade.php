@extends('layouts.admin')
@section('title', 'نمای کلی')
@section('eyebrow', 'میز کار شما')
@section('description', 'وضعیت خدمات و جریان رسیدگی به درخواستی‌ها، در یک نگاه.')
@section('actions')<a href="/individual-applications" class="btn btn-secondary">@include('elements.icon', ['name'=>'file']) تمام درخواستی‌ها</a>@endsection
@section('content')
@php
$number = function($value) { return strtr(number_format((int)$value), ['0'=>'۰','1'=>'۱','2'=>'۲','3'=>'۳','4'=>'۴','5'=>'۵','6'=>'۶','7'=>'۷','8'=>'۸','9'=>'۹',','=>'٬']); };
$metrics = [
    ['label'=>'مجموع متقاضیان', 'value'=>$totalApplications, 'icon'=>'users', 'tone'=>'slate', 'link'=>'', 'hint'=>'درخواست تذکرهٔ جدید'],
    ['label'=>'درخواستی‌های جدید', 'value'=>$statusCounts[0] ?? 0, 'icon'=>'clock', 'tone'=>'amber', 'link'=>'?status=0', 'hint'=>'در انتظار بررسی'],
    ['label'=>'فورم‌های ثبت‌شده', 'value'=>$statusCounts[2] ?? 0, 'icon'=>'file', 'tone'=>'blue', 'link'=>'?status=2', 'hint'=>'مرحلهٔ ثبت تکمیل شده'],
    ['label'=>'هویت تثبیت‌شده', 'value'=>$statusCounts[4] ?? 0, 'icon'=>'shield', 'tone'=>'', 'link'=>'?status=4', 'hint'=>'هویت متقاضی تأیید شده'],
];
@endphp
<section class="overview-banner" aria-label="شروع رسیدگی">
    <div class="overview-copy"><div class="overview-kicker">{{ Auth::user()->name }}، خوش آمدید</div><h2>هر درخواستی، روشن و قابل پیگیری.</h2><p>معلومات فامیل‌ها را بررسی کنید و جریان ثبت و تثبیت هویت متقاضیان را گام‌به‌گام پیگیری نمایید.</p><div class="overview-actions"><a href="/individual-applications?status=0" class="btn btn-primary">بررسی درخواستی‌های جدید @include('elements.icon', ['name'=>'arrow'])</a><a href="/admin/centers" class="text-link">مشاهدهٔ مراکز</a></div></div>
    <img class="overview-art" src="/img/panel-identity.svg" width="380" height="210" alt="" aria-hidden="true">
</section>
<div class="metrics">
@foreach($metrics as $metric)
    <a class="metric" href="/individual-applications{{ $metric['link'] }}"><div class="metric-top"><span class="metric-label">{{ $metric['label'] }}</span><span class="metric-icon {{ $metric['tone'] }}">@include('elements.icon', ['name'=>$metric['icon']])</span></div><strong class="metric-number">{{ $number($metric['value']) }}</strong><div class="metric-bottom"><span>{{ $metric['hint'] }}</span>@include('elements.icon', ['name'=>'arrow'])</div></a>
@endforeach
</div>
<div class="dashboard-grid">
    <section class="panel"><div class="section-head"><div><h2>جریان رسیدگی به درخواستی‌ها</h2><p>شمار متقاضیان در هر مرحلهٔ بررسی</p></div><span class="section-kicker">تمام مراکز</span></div><div class="status-list"><div class="status-column-labels"><span>مرحلهٔ درخواستی</span><span>شمار متقاضیان</span></div>
        @foreach($statusLabels as $status)
        @php $count = $statusCounts[$status->status] ?? 0; @endphp
        <a class="status-row" href="/individual-applications?status={{ $status->status }}"><span class="status-name"><span class="status-marker {{ in_array($status->status, [3,5,13]) ? 'danger' : ($status->status == 0 ? 'amber' : '') }}" aria-hidden="true">{{ $status->status == 13 ? '×' : $number($loop->iteration) }}</span>{{ $status->description }}</span><span class="status-track" aria-hidden="true"><span style="width:{{ $totalApplications ? round($count / $totalApplications * 100) : 0 }}%"></span></span><strong>{{ $number($count) }}</strong>@include('elements.icon', ['name'=>'arrow'])</a>
        @endforeach
    </div><div class="status-footer">برای بررسی درخواستی‌ها، مرحلهٔ مورد نظر را انتخاب کنید.</div></section>
    <div class="dashboard-aside">
        <section class="panel"><div class="section-head"><h2>دسترسی سریع</h2>@include('elements.icon', ['name'=>'dashboard'])</div>
            <a href="/admin/centers" class="shortcut"><span class="shortcut-icon">@include('elements.icon', ['name'=>'building'])</span><div><strong>مراکز توزیع</strong><small>معلومات و تنظیمات خدمات مراکز</small></div>@include('elements.icon', ['name'=>'arrow'])</a>
            <a href="/admin/users" class="shortcut"><span class="shortcut-icon">@include('elements.icon', ['name'=>'users'])</span><div><strong>کارمندان و دسترسی‌ها</strong><small>حساب‌ها، وظایف و صلاحیت‌ها</small></div>@include('elements.icon', ['name'=>'arrow'])</a>
        </section>
        <section class="schedule-prompt">@include('elements.icon', ['name'=>'calendar'])<div><h2>تقسیم اوقات مراکز</h2><p>روزهای کاری، ظرفیت ملاقات و رخصتی‌های عمومی را در یک‌جا تنظیم کنید.</p><a href="/admin/templates" class="text-link">مدیریت اوقات ملاقات @include('elements.icon', ['name'=>'arrow'])</a></div></section>
    </div>
</div>
@endsection

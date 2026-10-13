@extends('layouts.admin')
@section('title', 'نمای کلی سیستم')
@section('description', 'وضعیت درخواستی‌ها و دسترسی به بخش‌های مدیریتی، در یک نگاه.')
@section('actions')<a href="/individual-applications" class="btn btn-primary">@include('elements.icon', ['name'=>'file']) بررسی درخواستی‌ها</a>@endsection
@section('content')
@php
$metrics = [
    ['label'=>'مجموع متقاضیان', 'value'=>$totalApplications, 'icon'=>'users', 'tone'=>'slate', 'link'=>'', 'hint'=>'درخواست تذکرهٔ جدید'],
    ['label'=>'درخواستی‌های جدید', 'value'=>$statusCounts[0] ?? 0, 'icon'=>'clock', 'tone'=>'amber', 'link'=>'?status=0', 'hint'=>'در انتظار بررسی'],
    ['label'=>'فورم‌های ثبت‌شده', 'value'=>$statusCounts[2] ?? 0, 'icon'=>'file', 'tone'=>'blue', 'link'=>'?status=2', 'hint'=>'تکمیل مرحلهٔ ثبت'],
    ['label'=>'هویت تثبیت‌شده', 'value'=>$statusCounts[4] ?? 0, 'icon'=>'shield', 'tone'=>'', 'link'=>'?status=4', 'hint'=>'تأیید هویت متقاضی'],
];
@endphp
<div class="metrics">
@foreach($metrics as $metric)
    <a class="metric" href="/individual-applications{{ $metric['link'] }}"><div class="metric-top"><span class="metric-label">{{ $metric['label'] }}</span><span class="metric-icon {{ $metric['tone'] }}">@include('elements.icon', ['name'=>$metric['icon']])</span></div><strong class="metric-number">{{ number_format($metric['value']) }}</strong><div class="metric-bottom"><span>{{ $metric['hint'] }}</span>@include('elements.icon', ['name'=>'arrow'])</div></a>
@endforeach
</div>
<div class="dashboard-grid">
    <section class="panel"><div class="section-head"><div><h2>وضعیت درخواستی‌ها</h2><p>شمار متقاضیان در هر مرحلهٔ بررسی</p></div><span class="section-kicker">تمام مراکز</span></div><div class="status-list">
        @foreach($statusLabels as $status)
        @php $count = $statusCounts[$status->status] ?? 0; @endphp
        <a class="status-row" href="/individual-applications?status={{ $status->status }}"><span class="status-name"><span class="status-dot {{ in_array($status->status, [3,5,13]) ? 'danger' : ($status->status == 0 ? 'amber' : '') }}"></span>{{ $status->description }}</span><strong>{{ number_format($count) }}</strong><span class="status-track" aria-hidden="true"><span style="width:{{ $totalApplications ? round($count / $totalApplications * 100) : 0 }}%"></span></span>@include('elements.icon', ['name'=>'arrow'])</a>
        @endforeach
    </div></section>
    <div class="dashboard-aside">
        <section class="panel"><div class="section-head"><h2>دسترسی سریع</h2></div>
            <a href="/admin/centers" class="shortcut">@include('elements.icon', ['name'=>'building'])<div><strong>مراکز توزیع تذکره</strong><small>معلومات مراکز و تنظیم ملاقات‌ها</small></div>@include('elements.icon', ['name'=>'arrow'])</a>
            <a href="/admin/users" class="shortcut">@include('elements.icon', ['name'=>'users'])<div><strong>مدیریت کارمندان</strong><small>حساب‌ها، وظایف و صلاحیت‌ها</small></div>@include('elements.icon', ['name'=>'arrow'])</a>
            <a href="/admin/templates" class="shortcut">@include('elements.icon', ['name'=>'calendar'])<div><strong>تقسیم اوقات ملاقات</strong><small>روزهای کاری، ظرفیت و رخصتی‌ها</small></div>@include('elements.icon', ['name'=>'arrow'])</a>
        </section>
        <section class="info-panel">@include('elements.icon', ['name'=>'file'])<h2>رسیدگی به درخواستی‌های جدید</h2><p>درخواستی‌های رسیده را بررسی کنید و روند ثبت و تثبیت هویت هر فامیل را پیگیری نمایید.</p><a href="/individual-applications?status=0" class="text-link">مشاهدهٔ درخواستی‌های جدید @include('elements.icon', ['name'=>'arrow'])</a></section>
    </div>
</div>
@endsection

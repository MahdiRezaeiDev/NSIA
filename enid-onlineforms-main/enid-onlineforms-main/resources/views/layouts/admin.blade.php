<!DOCTYPE html>
<html lang="fa-AF" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'پنل مدیریت') | ادارهٔ ملی احصائیه و معلومات</title>
    <link href="/css/public.css" rel="stylesheet">
    <link href="/css/admin.css" rel="stylesheet">
    <link rel="preload" href="/fonts/Vazirmatn-Variable.woff2" as="font" type="font/woff2" crossorigin>
    <link href="/css/panel-tokens.css?v={{ filemtime(public_path('css/panel-tokens.css')) }}" rel="stylesheet">
    <link href="/css/admin-panel.css?v={{ filemtime(public_path('css/admin-panel.css')) }}" rel="stylesheet">
    @php $roleLabels = collect(\App\User::getRoles())->mapWithKeys(function($role) { return [$role => $role === 'admin' ? 'مدیر سیستم' : \App\User::roleToDari($role)]; }); @endphp
    <script>var AUTH_API_TOKEN = ""; window.NSIA_ROLES = @json($roleLabels);</script>
    <script src="/js/app.js"></script>
    <script src="/js/admin.js"></script>
</head>
<body class="admin-panel" ng-app="MainApp">
    <a class="skip-link" href="#main-content">رفتن به محتوای صفحه</a>
    <button class="sidebar-backdrop" type="button" aria-label="بستن منو" tabindex="-1" data-close-menu></button>
    <aside class="sidebar" id="sidebar" aria-label="منوی اصلی">
        <a class="brand" href="{{ Auth::user()->role == 'admin' ? '/home' : '/userDashboard' }}" aria-label="صفحهٔ اصلی"><img src="/img/logo.jpg" width="192" height="60" alt="ادارهٔ ملی احصائیه و معلومات"></a>
        <div class="sidebar-caption">مدیریت خدمات تذکرهٔ الکترونیکی</div>
        <div class="nav-label">محیط کاری</div>
        <nav class="sidebar-nav">
            <a href="{{ Auth::user()->role == 'admin' ? '/home' : '/userDashboard' }}" class="{{ request()->is('home', 'userDashboard') ? 'is-active' : '' }}" @if(request()->is('home', 'userDashboard')) aria-current="page" @endif>@include('elements.icon', ['name'=>'dashboard'])<span>نمای کلی</span></a>
            <a href="/individual-applications" class="{{ request()->is('individual-applications', 'viewIndividualApplication') ? 'is-active' : '' }}" @if(request()->is('individual-applications', 'viewIndividualApplication')) aria-current="page" @endif>@include('elements.icon', ['name'=>'file'])<span>درخواستی‌ها</span></a>
            @if(Auth::user()->role == 'admin')
            <div class="nav-label">مدیریت سیستم</div>
            <a href="/admin/centers" class="{{ request()->is('admin/centers', 'admin/newCenter') ? 'is-active' : '' }}" @if(request()->is('admin/centers', 'admin/newCenter')) aria-current="page" @endif>@include('elements.icon', ['name'=>'building'])<span>مراکز توزیع</span></a>
            <a href="/admin/users" class="{{ request()->is('admin/users', 'admin/newUser') ? 'is-active' : '' }}" @if(request()->is('admin/users', 'admin/newUser')) aria-current="page" @endif>@include('elements.icon', ['name'=>'users'])<span>کارمندان</span></a>
            <a href="/admin/templates" class="{{ request()->is('admin/templates', 'admin/template*') ? 'is-active' : '' }}" @if(request()->is('admin/templates', 'admin/template*')) aria-current="page" @endif>@include('elements.icon', ['name'=>'calendar'])<span>اوقات ملاقات</span></a>
            @endif
        </nav>
        <div class="sidebar-bottom">
            <a href="/changePasswordForm" class="{{ request()->is('changePasswordForm') ? 'is-active' : '' }}">@include('elements.icon', ['name'=>'lock'])<span>تغییر رمز عبور</span></a>
            <a href="/logout?_token={{ csrf_token() }}">@include('elements.icon', ['name'=>'logout'])<span>خروج از حساب</span></a>
            <div class="sidebar-account"><span class="avatar">{{ mb_substr(Auth::user()->name, 0, 1) }}</span><div><strong>{{ Auth::user()->name }}</strong><small>{{ Auth::user()->role == 'admin' ? 'مدیر سیستم' : Auth::user()->role_in_dari }}</small></div></div>
        </div>
    </aside>
    <div class="workspace">
        <header class="topbar">
            <div class="topbar-start"><button type="button" class="icon-button menu-toggle" aria-label="باز کردن منو" aria-controls="sidebar" aria-expanded="false" id="menu-toggle">@include('elements.icon', ['name'=>'menu'])</button><span class="topbar-title">خدمات تذکرهٔ الکترونیکی</span><span class="topbar-divider"></span><span class="muted">پنل {{ Auth::user()->role == 'admin' ? 'مدیریت' : 'کارمند' }}</span></div>
            <div class="topbar-end"><time class="today" datetime="{{ date('Y-m-d') }}">@include('elements.icon', ['name'=>'calendar'])<span><small>تاریخ امروز</small><bdi>{{ \Hijri::now()->format('Y/m/d') }}</bdi></span></time><a class="topbar-account" href="/changePasswordForm" aria-label="حساب {{ Auth::user()->name }}؛ تغییر رمز عبور"><span class="avatar">{{ mb_substr(Auth::user()->name, 0, 1) }}</span><span>{{ Auth::user()->name }}<small>{{ Auth::user()->role == 'admin' ? 'مدیر سیستم' : Auth::user()->role_in_dari }}</small></span></a></div>
        </header>
        <main id="main-content" class="main-content" tabindex="-1">
            <div class="page-heading"><div><div class="eyebrow">@yield('eyebrow', 'مدیریت خدمات تذکره')</div><h1>@yield('title', 'پنل مدیریت')</h1><p>@yield('description')</p></div><div class="heading-actions">@yield('actions')</div></div>
            @yield('content')
        </main>
        <footer class="panel-footer"><span>ادارهٔ ملی احصائیه و معلومات</span><span>خدمات تذکرهٔ الکترونیکی</span></footer>
    </div>
    <script src="/js/rm.js"></script>
    <script src="/js/admin_custom.js?v={{ filemtime(public_path('js/admin_custom.js')) }}"></script>
    <script src="/js/admin-panel.js?v={{ filemtime(public_path('js/admin-panel.js')) }}"></script>
    @stack('scripts')
</body>
</html>

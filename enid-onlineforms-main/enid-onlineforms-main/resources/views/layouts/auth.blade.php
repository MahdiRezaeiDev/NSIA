<!DOCTYPE html>
<html lang="fa-AF" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'ورود به سیستم') | ادارهٔ ملی احصائیه و معلومات</title>
    <link rel="preload" href="{{ asset('fonts/bahij_helvetica_neue_roman_by_bahijvirtualacademy-dammd50_0.c89c9eb963cc00332e6c.ttf') }}" as="font" type="font/ttf" crossorigin>
    <link rel="stylesheet" href="{{ asset('css/panel-tokens.css') }}?v={{ filemtime(public_path('css/panel-tokens.css')) }}">
    <link rel="stylesheet" href="{{ asset('css/auth.css') }}?v={{ filemtime(public_path('css/auth.css')) }}">
    <script src="{{ asset('js/auth-login.js') }}" defer></script>
</head>
<body class="auth-page">
    <a class="skip-link" href="#@yield('form-id', 'login-form')">رفتن به فورم</a>
    <header class="auth-header">
        <div class="auth-header-inner">
            <img class="auth-logo" src="{{ asset('img/logo.jpg') }}" width="256" height="80" alt="ادارهٔ ملی احصائیه و معلومات">
            <p class="header-caption">سیستم خدمات آنلاین<br><span>تذکرهٔ الکترونیکی</span></p>
        </div>
    </header>
    <main class="auth-main">@yield('content')</main>
    <footer class="auth-footer">ادارهٔ ملی احصائیه و معلومات <span aria-hidden="true">·</span> خدمات آنلاین تذکرهٔ الکترونیکی</footer>
</body>
</html>

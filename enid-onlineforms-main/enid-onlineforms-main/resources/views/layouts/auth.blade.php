<!DOCTYPE html>
<html lang="fa-AF" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>ورود به سیستم | ادارهٔ ملی احصائیه و معلومات</title>
    <link rel="stylesheet" href="{{ asset('css/auth.css') }}">
    <script src="{{ asset('js/auth-login.js') }}" defer></script>
</head>
<body class="auth-page">
    <a class="skip-link" href="#login-form">رفتن به فورم ورود</a>
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

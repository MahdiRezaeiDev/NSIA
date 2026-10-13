(function () {
    'use strict';
    var form = document.getElementById('login-form');
    if (!form) return;
    var password = document.getElementById('password');
    var toggle = document.getElementById('password-toggle');
    var submit = form.querySelector('button[type="submit"]');
    var label = document.getElementById('submit-label');
    var status = document.getElementById('submit-status');
    toggle.hidden = false;
    toggle.addEventListener('click', function () {
        var visible = password.type === 'password';
        password.type = visible ? 'text' : 'password';
        toggle.setAttribute('aria-pressed', visible ? 'true' : 'false');
        toggle.setAttribute('aria-label', visible ? 'پنهان‌کردن رمز عبور' : 'نمایش رمز عبور');
    });
    form.addEventListener('submit', function () {
        submit.disabled = true;
        label.textContent = 'در حال ورود…';
        status.textContent = 'لطفاً چند لحظه منتظر بمانید.';
    });
    window.addEventListener('pageshow', function () {
        submit.disabled = false;
        label.textContent = 'ورود به سیستم';
        status.textContent = '';
    });
}());

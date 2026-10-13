(function () {
    'use strict';
    var form = document.querySelector('[data-auth-form], #login-form');
    if (!form) return;
    var submit = form.querySelector('button[type="submit"]');
    var label = document.getElementById('submit-label');
    var status = document.getElementById('submit-status');
    var defaultLabel = label.textContent;
    var toggles = form.querySelectorAll('#password-toggle, [data-password-toggle]');
    Array.prototype.forEach.call(toggles, function (toggle) {
        var password = document.getElementById(toggle.getAttribute('aria-controls'));
        if (!password) return;
        var fieldLabel = toggle.getAttribute('data-password-label') || 'رمز عبور';
        toggle.hidden = false;
        toggle.addEventListener('click', function () {
            var visible = password.type === 'password';
            password.type = visible ? 'text' : 'password';
            toggle.setAttribute('aria-pressed', visible ? 'true' : 'false');
            toggle.setAttribute('aria-label', (visible ? 'پنهان‌کردن ' : 'نمایش ') + fieldLabel);
        });
    });
    form.addEventListener('submit', function () {
        submit.disabled = true;
        label.textContent = form.getAttribute('data-submit-label') || 'در حال ورود…';
        status.textContent = 'لطفاً چند لحظه منتظر بمانید.';
    });
    window.addEventListener('pageshow', function () {
        submit.disabled = false;
        label.textContent = defaultLabel;
        status.textContent = '';
    });
}());

<?php

return [
    // Disabled CAPTCHA is accepted only in local/testing; production always verifies it.
    'captcha_driver' => env('CAPTCHA_DRIVER', env('APP_ENV', 'production') === 'local' ? 'disabled' : 'google'),
    'captcha_min_score' => 0.3,
    'captcha_hostnames' => array_filter(array_map('trim', explode(',', env('CAPTCHA_HOSTNAMES', parse_url(env('APP_URL', ''), PHP_URL_HOST) ?: '')))),
];

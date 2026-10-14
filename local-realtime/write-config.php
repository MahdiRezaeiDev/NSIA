<?php
// Keep the local socket server's Redis prefix in sync with Laravel's APP_NAME.
$root = dirname(__DIR__);
require $root.'/enid-onlineforms-main/enid-onlineforms-main/vendor/autoload.php';
$app = require $root.'/enid-onlineforms-main/enid-onlineforms-main/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
if (!app()->environment('local')) { throw new RuntimeException('This launcher is only for the local environment.'); }
$redis = config('database.redis.default');
if (!in_array($redis['host'], ['127.0.0.1', 'localhost'], true) || (int)$redis['port'] !== 6379 || !empty($redis['url'])) {
    throw new RuntimeException('The local launcher requires Redis at 127.0.0.1:6379.');
}
$settings = json_decode(file_get_contents(__DIR__.'/laravel-echo-server.json'), true);
$settings['databaseConfig']['redis'] = [
    'host' => '127.0.0.1', 'port' => 6379, 'db' => (int)$redis['database'],
    'keyPrefix' => config('database.redis.options.prefix', ''),
];
if (!empty($redis['password'])) { $settings['databaseConfig']['redis']['password'] = $redis['password']; }
$directory = $root.'/.runtime/realtime-config';
if (!is_dir($directory)) { mkdir($directory, 0700, true); }
file_put_contents($directory.'/laravel-echo-server.json', json_encode($settings, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES).PHP_EOL);
echo "Local realtime configuration synchronized with Laravel.\n";

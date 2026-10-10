# NSIA Online Forms

Laravel backend with two Angular frontends:

- `enid-onlineforms-main/enid-onlineforms-main`: Laravel 5.8 / PHP 7.4
- `nid-onlineform-web-main/nid-onlineform-web-main`: public forms / Angular 7
- `nsia-centers-master/nsia-centers-master`: centers / Angular 8

## Setup

Use PHP 7.4.33, Node.js 12.22.12, Composer and MySQL. Enable PHP extensions required by Composer, including pdo_mysql, mbstring, openssl, gd, fileinfo and zip.

1. In the backend, run `composer install`, copy `.env.example` to `.env`, configure the database, and run `php artisan key:generate`.
2. Use a new database and run `php artisan migrate`. Existing production data and reference data must be transferred separately through a secure channel; no database dump is included. Migrations alone may not supply all reference data required by the application.
3. Generate local Passport keys with `php artisan passport:keys`. Provision OAuth clients and external verification credentials for your environment.
4. Run `npm ci` in each frontend. Use Node 12 for this legacy application.

## Run on Windows

The launchers expect PHP in `.runtime/php74` and Node in `.runtime/node-v12.22.12-win-x64`. Enable the PHP extensions in your local php.ini.

Official runtime archives:
- https://downloads.php.net/~windows/releases/archives/php-7.4.33-Win32-vc15-x64.zip
- https://nodejs.org/download/release/v12.22.12/node-v12.22.12-win-x64.zip

Start MySQL, then run each command in a separate terminal:

```powershell
.\start-local.cmd backend
.\start-local.cmd forms
.\start-local.cmd centers
```

Backend: http://127.0.0.1:8088; forms: http://127.0.0.1:4200; centers: http://127.0.0.1:4202.

Stop with Ctrl+C. For direct CLI commands, load `local-env.ps1` in PowerShell. Frontend production API addresses should be configured before deployment.

## Repository contents

Source, required static assets, dependency lockfiles, migrations, tests and launch scripts are included. Dependencies, local runtimes, AI tooling, environment credentials, database dumps, uploaded files, caches and logs are excluded. Laravel storage directories and the placeholder image are retained.

The original backend Git history is preserved locally in `.local-backup/backend.git` and is excluded from this repository. PHP 7.4 and Node 12 are legacy versions; these instructions describe the current application requirements.
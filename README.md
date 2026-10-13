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

## Backend hardening and regression checks

For an existing database, apply the additive schema updates before serving requests:

```powershell
php artisan migrate --force
```

The updates add the IVP attempt flag, create the cancellation archive and application-list view when absent, and widen short verification-code columns to avoid truncation. The duplicate legacy users/logs migration class names have been separated; compatibility updates preserve existing tables and add the missing remember-login column. Their rollbacks keep existing data. Enable the Imagick extension for document images and PDF attachments. Set `ATTACHMENTS_FILESYSTEM_DISK` and `PDF_FILESYSTEM_DISK` consistently for your environment; local installations use `local`, production normally uses `s3`.

Production requires `APP_ENV=production`, `APP_DEBUG=false`, `CAPTCHA_DRIVER=google`, a valid `CAPTCHA_KEY`, and `CAPTCHA_HOSTNAMES` containing the public forms hostnames. Disabled CAPTCHA is accepted only in local/testing. Login, tracking, form recovery and submission keep their existing endpoint names and response fields. Public recovery still uses the existing reference-number-plus-CAPTCHA workflow; stronger ownership verification would require a corresponding frontend workflow.

Staff access now checks account activity, center scope and permitted transitions. Administrators and auditors retain oversight access; center managers retain the existing government-center scope. Verification uses the stored application's state and validates system codes through IVP, or verifies that a selected local match belongs to the applicant. Existing manual phone/archive verification remains available to authorized verification staff. Legacy photo/document download endpoints now require an API bearer token and application access; external consumers must authenticate instead of relying on the encrypted identifier alone. The existing `verificationApi` service role can read only applications already transmitted to IVP and retains its dedicated callback contract.

NID image uploads store the actual S3 object paths for signatures, portraits and documents. Failed batches roll back their database records and remove newly written objects. NID status/number lookups are limited to the uploading account, with administrator and auditor oversight access; other accounts receive the existing record-not-found response. Regression coverage for these paths is in `NidImagesTest`.

Web forms require CSRF tokens. Legacy state-changing web GET actions also require a token; generated action links and logout links include it. The backend's existing manual identity-confirmation action is explicitly labelled and recorded as archive verification, with the same role/center checks as the API. Angular API calls keep their existing bearer-token contract. Logs store limited operational metadata instead of passwords, tokens or applicant payloads. General and activity reports read current events, and the center leader dashboard uses current counts. Print tokens are family-bound and expire after two hours. PDFs retain their templates and omit empty attachment pages and cancelled applicants.

The performance migration adds non-unique family-reference and appointment-slot indexes; it does not rewrite records, and its rollback removes only those named indexes. Dashboards aggregate all permitted centers in two queries. Multi-slot appointment days use one count query per day, without caching capacity; final booking validation continues to read current availability. `BackendPerformanceTest` compares dashboard totals and role scopes with the prior calculations and checks full slots, holidays and newly booked appointments.

The backend login at `/login` uses the existing NSIA logo, Bahij fonts and teal/navy palette, with a responsive Dari layout. Its styles and scripts are scoped to the login page. Authentication, CSRF, remember-login and role-based redirects retain their existing behavior; web login errors are localized to Dari.

Password recovery (`/password/reset`) and new-password forms share that authentication layout, with Dari validation and status messages. Successful resets return administrators to `/home` and center staff to `/userDashboard`. Recovery tests fake notifications and verify expired/reused tokens, confirmation errors and CSRF; actual email delivery depends on the configured mail transport. Local access credentials belong outside the repository.

Run the complete suite to include the performance, NID and login checks:

```powershell
php artisan backend:prepare-test-database
php vendor/phpunit/phpunit/phpunit
```

The preparation command is available only in local/testing and copies schema plus centers, districts and appointment templates into `nsia_test_backend`; it does not copy applicants, accounts or logs. Use `--database=nsia_test_custom` and set `NSIA_TEST_DATABASE=nsia_test_custom` to choose another test database. Test writes are rolled back. The suite covers permissions, transitions, CAPTCHA, CSRF, request logging, print-token scope, route-specific throttling and a synthetic four-person family's registration, review and PDF generation. External IVP/CAPTCHA responses are mocked; live external services and browser clicks require separate deployment verification.

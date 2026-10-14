param(
    [ValidateSet('backend', 'forms', 'centers', 'realtime')]
    [string]$Component = 'backend'
)
. "$PSScriptRoot/local-env.ps1"
switch ($Component) {
    'backend' {
        & "$PSScriptRoot/start-realtime.ps1"
        $env:BROADCAST_DRIVER = 'redis'
        Set-Location $backendDirectory
        & "$phpDirectory/php.exe" artisan serve --host=127.0.0.1 --port=8088
    }
    'forms' {
        Set-Location $formsDirectory
        & "$nodeDirectory/node.exe" node_modules/@angular/cli/bin/ng serve --host=127.0.0.1 --port=4200
    }
    'centers' {
        & "$PSScriptRoot/start-realtime.ps1"
        Set-Location $centersDirectory
        & "$nodeDirectory/node.exe" node_modules/@angular/cli/bin/ng serve --host=127.0.0.1 --port=4202
    }
    'realtime' {
        & "$PSScriptRoot/start-realtime.ps1"
    }
}
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

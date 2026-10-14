# Starts the project's local Redis and authenticated Socket.IO service.
# First install dependencies with: npm --prefix local-realtime ci --ignore-scripts
param()
. "$PSScriptRoot/local-env.ps1"
$realtimeDirectory = Join-Path $projectRoot 'local-realtime'
$configDirectory = Join-Path $projectRoot '.runtime/realtime-config'
$echoEntry = Join-Path $realtimeDirectory 'node_modules/laravel-echo-server/bin/server.js'
if (!(Test-Path -LiteralPath $echoEntry)) {
    throw 'Realtime dependencies are missing. Run: npm --prefix local-realtime ci --ignore-scripts'
}
& "$phpDirectory/php.exe" "$realtimeDirectory/write-config.php"
if ($LASTEXITCODE -ne 0) { throw 'Could not prepare local realtime configuration.' }
if (!(Get-Command docker -ErrorAction SilentlyContinue)) { throw 'Docker Desktop is required for local Redis.' }
$ErrorActionPreference = 'Continue'
$null = & docker info --format '{{.ServerVersion}}' 2>&1
$dockerRunning = $LASTEXITCODE -eq 0
$ErrorActionPreference = 'Stop'
if (!$dockerRunning) {
    & docker desktop start
    if ($LASTEXITCODE -ne 0) { throw 'Docker Desktop could not start.' }
}
& docker compose -f "$realtimeDirectory/compose.yaml" up -d --wait redis
if ($LASTEXITCODE -ne 0) { throw 'Local Redis could not start.' }

function Test-RealtimePort {
    $client = New-Object Net.Sockets.TcpClient
    try { $client.Connect('127.0.0.1', 3001); return $true }
    catch { return $false }
    finally { $client.Dispose() }
}
$pidFile = Join-Path $projectRoot '.runtime/realtime.pid'
if (Test-RealtimePort) {
    if (Test-Path -LiteralPath $pidFile) {
        $running = Get-Process -Id ([int](Get-Content -LiteralPath $pidFile)) -ErrorAction SilentlyContinue
        if ($running -and $running.Path -eq "$nodeDirectory\node.exe") {
            Write-Output 'Local realtime service is already running on 127.0.0.1:3001.'
            return
        }
    }
    throw 'Port 3001 is already in use by another process.'
}
$server = Start-Process -FilePath "$nodeDirectory/node.exe" -ArgumentList @('node_modules/laravel-echo-server/bin/server.js', 'start', ('--dir="' + $configDirectory + '"')) -WorkingDirectory $realtimeDirectory -WindowStyle Hidden -RedirectStandardOutput "$projectRoot/.runtime/realtime.stdout.log" -RedirectStandardError "$projectRoot/.runtime/realtime.stderr.log" -PassThru
Set-Content -LiteralPath $pidFile -Value $server.Id -Encoding ASCII
$deadline = (Get-Date).AddSeconds(30)
while ((Get-Date) -lt $deadline) {
    if (Test-RealtimePort) { Write-Output 'Local realtime service is ready on 127.0.0.1:3001.'; return }
    if ($server.HasExited) { throw 'Realtime service stopped. Check .runtime/realtime.stderr.log.' }
    Start-Sleep -Milliseconds 250
}
throw 'Realtime startup timed out. Check .runtime/realtime.stderr.log.'

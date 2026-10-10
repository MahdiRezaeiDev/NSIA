$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot
$phpDirectory = Join-Path $projectRoot '.runtime/php74'
$nodeDirectory = Join-Path $projectRoot '.runtime/node-v12.22.12-win-x64'
if (!(Test-Path "$phpDirectory/php.exe") -or !(Test-Path "$nodeDirectory/node.exe")) {
    throw 'Local runtimes are missing. PHP 7.4 belongs in .runtime/php74 and Node 12 in .runtime/node-v12.22.12-win-x64.'
}
$env:Path = "$phpDirectory;$nodeDirectory;$env:Path"
$env:PHPRC = $phpDirectory
$backendDirectory = Join-Path $projectRoot 'enid-onlineforms-main/enid-onlineforms-main'
$formsDirectory = Join-Path $projectRoot 'nid-onlineform-web-main/nid-onlineform-web-main'
$centersDirectory = Join-Path $projectRoot 'nsia-centers-master/nsia-centers-master'

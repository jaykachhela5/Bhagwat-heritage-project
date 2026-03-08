$ErrorActionPreference = "Stop"

$tempDir = Join-Path $PSScriptRoot ".temp"
$viteBin = Join-Path $PSScriptRoot "node_modules\vite\bin\vite.js"

New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

$env:TEMP = $tempDir
$env:TMP = $tempDir
$env:TMPDIR = $tempDir
$env:CHOKIDAR_USEPOLLING = "1"

if (-not (Test-Path $viteBin)) {
  throw "Vite is not installed. Run 'npm install' inside the frontend folder first."
}

Write-Host "Using TEMP directory: $tempDir"
Write-Host "Starting Vite dev server with auto reload..."

& node $viteBin

exit $LASTEXITCODE

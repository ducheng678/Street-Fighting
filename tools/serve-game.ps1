$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$Listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, 0)
$Listener.Start()
$Port = ($Listener.LocalEndpoint).Port
$Url = "http://127.0.0.1:$Port/index.html"

function Get-ContentType($Path) {
  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8"; break }
    ".js" { "text/javascript; charset=utf-8"; break }
    ".css" { "text/css; charset=utf-8"; break }
    ".png" { "image/png"; break }
    ".jpg" { "image/jpeg"; break }
    ".jpeg" { "image/jpeg"; break }
    ".gif" { "image/gif"; break }
    ".svg" { "image/svg+xml"; break }
    default { "application/octet-stream" }
  }
}

function Send-Response($Stream, $Status, $ContentType, $Body) {
  $Header = "HTTP/1.1 $Status`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`nConnection: close`r`n`r`n"
  $HeaderBytes = [System.Text.Encoding]::ASCII.GetBytes($Header)
  $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
}

Write-Host "Serving game at $Url"
Write-Host "Close this window to stop the local game server."
Start-Process $Url

while ($true) {
  $Client = $Listener.AcceptTcpClient()
  try {
    $Stream = $Client.GetStream()
    $Reader = [System.IO.StreamReader]::new($Stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
    $RequestLine = $Reader.ReadLine()
    if ([string]::IsNullOrWhiteSpace($RequestLine)) {
      continue
    }

    $Parts = $RequestLine.Split(" ")
    $RawPath = if ($Parts.Length -ge 2) { $Parts[1] } else { "/" }
    $RequestPath = [System.Uri]::UnescapeDataString(($RawPath -split "\?")[0]).TrimStart("/")
    if ([string]::IsNullOrWhiteSpace($RequestPath)) {
      $RequestPath = "index.html"
    }

    while ($Reader.ReadLine()) {}

    $Target = [System.IO.Path]::GetFullPath((Join-Path $Root $RequestPath))
    if (-not $Target.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase) -or -not [System.IO.File]::Exists($Target)) {
      $Body = [System.Text.Encoding]::UTF8.GetBytes("Not found")
      Send-Response $Stream "404 Not Found" "text/plain; charset=utf-8" $Body
      continue
    }

    $Bytes = [System.IO.File]::ReadAllBytes($Target)
    Send-Response $Stream "200 OK" (Get-ContentType $Target) $Bytes
  } catch {
    try {
      $Body = [System.Text.Encoding]::UTF8.GetBytes("Server error")
      Send-Response $Stream "500 Internal Server Error" "text/plain; charset=utf-8" $Body
    } catch {}
  } finally {
    $Client.Close()
  }
}

param(
  [string]$Branch = "main",
  [string]$GiteeRemote = "origin",
  [string]$GitHubRemote = "github"
)

$ErrorActionPreference = "Stop"

Write-Host "推送到 Gitee: $GiteeRemote/$Branch"
git push $GiteeRemote $Branch

Write-Host "推送到 GitHub: $GitHubRemote/$Branch"
git push $GitHubRemote $Branch

Write-Host "两个远端都已推送完成。"

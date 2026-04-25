param(
  [string]$Branch = "main",
  [string]$GiteeRemote = "origin",
  [string]$GitHubRemote = "github"
)

$ErrorActionPreference = "Stop"

Write-Host "Push to Gitee: $GiteeRemote/$Branch"
git push $GiteeRemote $Branch

Write-Host "Push to GitHub: $GitHubRemote/$Branch"
git push $GitHubRemote $Branch

Write-Host "Both remotes have been pushed successfully."

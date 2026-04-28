# ==============================================================================
#  一键部署脚本：本地构建 -> 上传 -> 远端原子替换
#  使用：在项目根目录执行  powershell -ExecutionPolicy Bypass -File deploy\deploy.ps1
#
#  前置条件：
#   1. 本机已安装 Node.js（npm run build 能跑）
#   2. 本机已安装 OpenSSH 客户端（Win10/11 自带；命令行 ssh -V 能用即可）
#   3. 已能用 ssh 免密登录服务器（推荐配置 SSH key）
#   4. 服务器已经按 README 中的步骤装好 Nginx 并配好站点（首次部署需要）
# ==============================================================================

# ↓↓↓ 改成你自己的服务器信息 ↓↓↓
$RemoteUser  = 'ubuntu'                 # 登录用户名（腾讯云 Ubuntu 默认是 ubuntu）
$RemoteHost  = '1.2.3.4'                # 公网 IP 或域名
$RemotePort  = 22                       # SSH 端口
$RemoteRoot  = '/var/www/mall'          # 站点根目录
# ↑↑↑ 改成你自己的服务器信息 ↑↑↑

$ErrorActionPreference = 'Stop'

Write-Host "==> [1/4] 本地构建..." -ForegroundColor Cyan
npm run build

if (-not (Test-Path .\dist)) {
    throw 'dist 目录不存在，构建失败'
}

Write-Host "==> [2/4] 打包 dist..." -ForegroundColor Cyan
$tarball = "mall-dist.tar.gz"
if (Test-Path $tarball) { Remove-Item $tarball -Force }
tar -czf $tarball -C dist .

Write-Host "==> [3/4] 上传到服务器..." -ForegroundColor Cyan
scp -P $RemotePort $tarball "${RemoteUser}@${RemoteHost}:/tmp/$tarball"

Write-Host "==> [4/4] 服务器原子替换..." -ForegroundColor Cyan
$remoteScript = @"
set -e
sudo mkdir -p $RemoteRoot.new
sudo tar -xzf /tmp/$tarball -C $RemoteRoot.new
if [ -d $RemoteRoot ]; then sudo rm -rf $RemoteRoot.bak; sudo mv $RemoteRoot $RemoteRoot.bak; fi
sudo mv $RemoteRoot.new $RemoteRoot
sudo chown -R www-data:www-data $RemoteRoot
sudo nginx -t && sudo systemctl reload nginx
rm -f /tmp/$tarball
echo '部署完成'
"@

ssh -p $RemotePort "${RemoteUser}@${RemoteHost}" $remoteScript

Remove-Item $tarball -Force
Write-Host "==> 全部完成 ✅  访问 http://$RemoteHost 查看" -ForegroundColor Green

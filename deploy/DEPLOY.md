# 多商城部署手册

> 本项目是一个**模板化**的 H5 商城，可以从同一份代码 fork 出 N 个不同品牌、不同商品、不同主题色的商城，分别部署到同一台服务器的不同目录与不同域名。
>
> 这份文档负责指导：
> 1. **如何 fork 一个新商城**（克隆配置、改主题色、换商品）
> 2. **如何部署任意一个商城到服务器**（mall / mall_1 / mall_2 ... 通用）

---

## 0. 现有商城登记

每次新增一个商城，把它登记到这张表里，避免冲突。

| 名称 | 站点目录 | 访问域名 | Nginx 配置 | 分支 |
|---|---|---|---|---|
| 悠选 (默认) | `/var/www/mall` | `https://xxl.nengzhan.xyz` | `/etc/nginx/sites-available/mall.conf` | `main` |
| _示例: 萌宠商城_ | _`/var/www/mall_1`_ | _`https://pet.nengzhan.xyz`_ | _`/etc/nginx/sites-available/mall_1.conf`_ | _`mall_1`_ |

> **服务器固定信息**：IP `150.109.64.233`，SSH 用户 `ubuntu`。

---

## 1. 所有差异化数据集中在哪儿

只需要改下面这 3 个文件，就能把 mall 变成一个全新的商城：

```
src/config/
├── site.ts       # 品牌名 / 主题色 / 虚拟用户信息 / 服务承诺 / 店铺名 / 文案
├── banners.ts    # 首页轮播
└── products.ts   # 商品列表 + 分类列表
```

举例：

| 想改什么 | 改 `src/config/` 哪个文件 |
|---|---|
| 商城名（"悠选"→"萌宠生活"） | `site.ts` 里的 `brand.name`、`brand.fullName`、`brand.title`、`pageFooter` 等 |
| 主题色（粉红→深绿） | `site.ts` 里的 `theme.*`（9 个色值）|
| 浏览器 tab 标题 | `site.ts` 里的 `brand.title` |
| 假地址 / 假手机号 | `site.ts` 里的 `user.*` |
| 服务承诺（"顺丰包邮"等） | `site.ts` 里的 `services` |
| 店铺名 | `site.ts` 里的 `shop.name` |
| 首页 banner | `banners.ts` |
| 商品 / 分类 | `products.ts` |

> 业务逻辑、页面结构、组件样式都在配置之外，**新分支只改 config 不会冲突**，未来主分支升级也能直接 merge 过去。

---

## 2. Fork 一个新商城（流程）

下面以新增 **mall_1（萌宠商城）** 为例。

### 2.1 本地：从 main 拉新分支

```powershell
cd e:\develop\mall

git checkout main
git pull
git checkout -b mall_1
```

### 2.2 改配置

打开 `src/config/site.ts`，按需改 brand / theme / user / services / shop / pageFooter：

```ts
export const siteConfig: SiteConfig = {
  brand: {
    name: '萌宠',
    fullName: '萌宠生活',
    slogan: '让毛孩子更幸福',
    title: '萌宠生活 - 让毛孩子更幸福',
  },
  theme: {
    primary: '#22c55e',           // 绿
    primaryDark: '#15803d',
    accent: '#f59e0b',
    primaryGradient: 'linear-gradient(135deg, #4ade80, #22c55e)',
    accentGradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    headerGradient: 'linear-gradient(180deg, #22c55e 0%, #4ade80 100%)',
    profileGradient: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
    primaryShadow: 'rgba(34, 197, 94, 0.3)',
    successGradient: 'linear-gradient(135deg, #52c41a, #389e0d)',
  },
  user: { name: '李喵喵', phone: '139 **** 9999', address: '...', avatarChar: '萌', vipLevel: 'VIP2', userId: '6666 6666' },
  services: ['· 包邮 24h 发货', '· 30 天无忧退换', '· 假一赔三'],
  shop: { name: '萌宠生活官方店' },
  pageFooter: '— 萌宠生活 · 让毛孩子更幸福 —',
}
```

> **主题色快速调色板小贴士**：在 `theme.primary` 处放主色，其他几个渐变/阴影色都从主色衍生即可。线上效果不满意就回来改一行，重新部署。

打开 `src/config/products.ts`、`src/config/banners.ts` 替换商品和轮播图。

### 2.3 本地预览

```powershell
npm run dev
```

浏览器访问 `http://localhost:5173`，确认主题色、商品、文案都对。

### 2.4 提交分支

```powershell
git add src/config/
git commit -m "feat: mall_1 萌宠商城配置"
git push -u origin mall_1
```

> 以后只要在该分支再改 config 就好；如果主仓库 main 升级了组件/逻辑，可以 `git merge main` 同步过来，因为修改完全分离在 config 层，**几乎不会有冲突**。

---

## 3. 部署到服务器（任意商城通用）

下面所有命令把出现的 **`mall`** 替换成你这个商城的实际名字（`mall_1`、`mall_2`...）即可。**默认 mall 不需要改**。

### 3.1 本地：构建 + 打包

```powershell
cd e:\develop\mall
git checkout mall_1                # 切到目标分支（默认商城跳过这步）

npm run build
Compress-Archive -Path dist\* -DestinationPath mall_1-deploy.zip -Force
Get-ChildItem mall_1-deploy.zip | Select-Object Name, Length
```

> **建议给 zip 加上商城名前缀**（比如 `mall_1-deploy.zip`），避免不同商城互相覆盖。

### 3.2 本地：上传到服务器

打开腾讯云 OrcaTerm，**右上角点上传按钮 / 或直接拖拽**，把 `mall_1-deploy.zip` 上传到 `/home/ubuntu/`。

上传完毕后**必须**先验证：

```bash
ls -la ~/mall_1-deploy.zip
```

看到一行 `-rw-r--r-- ... mall_1-deploy.zip` 才能继续。

### 3.3 服务器：首次部署需要初始化（仅第一次）

> **如果只是更新已有商城，跳过本节直接到 3.4。**

#### 3.3.1 创建站点目录

```bash
SITE=mall_1                                   # 改成你这个商城的名字
sudo mkdir -p /var/www/$SITE
sudo chown -R www-data:www-data /var/www/$SITE
```

#### 3.3.2 写 Nginx 配置

`deploy/nginx.conf` 是当前商城（`mall`）的配置。新增其他商城时复制改一下：

```bash
SITE=mall_1
DOMAIN=pet.nengzhan.xyz                       # 改成实际域名

sudo tee /etc/nginx/sites-available/$SITE.conf > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;

    root /var/www/$SITE;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    gzip on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
}
EOF

sudo ln -sf /etc/nginx/sites-available/$SITE.conf /etc/nginx/sites-enabled/$SITE.conf

sudo nginx -t && sudo systemctl reload nginx
```

#### 3.3.3 DNS 解析

在域名服务商加 A 记录，主机记录填子域名前缀（如 `pet`），值填 `150.109.64.233`。

#### 3.3.4 HTTPS 证书

```bash
sudo certbot --nginx -d pet.nengzhan.xyz
```

按提示走，最后一项选 `2 (Redirect)`。证书到期前 60 天自动续期。

### 3.4 服务器：解压并替换站点（每次更新都做）

> **复制下面这一整段**，先按需改第一行的 `SITE` 即可。

```bash
SITE=mall_1                                  # 默认 mall 商城就改成 mall

mkdir -p /tmp/$SITE-deploy
unzip -o ~/$SITE-deploy.zip -d /tmp/$SITE-deploy

sudo rm -rf /var/www/$SITE/*
sudo cp -r /tmp/$SITE-deploy/index.html /tmp/$SITE-deploy/assets /var/www/$SITE/
sudo chown -R www-data:www-data /var/www/$SITE

rm -rf /tmp/$SITE-deploy ~/$SITE-deploy.zip
ls /var/www/$SITE
```

最后一行 `ls /var/www/$SITE` 能看到 `assets` 和 `index.html` 就完成了。

> **不需要 reload nginx**——只是换了静态文件，Nginx 自动用新文件。

### 3.5 验证

浏览器打开对应域名 + **`Ctrl + F5` 强刷**：

- `mall` → `https://xxl.nengzhan.xyz`
- `mall_1` → `https://pet.nengzhan.xyz`
- ...

---

## 4. 速查命令面板

### 本地三连（改配置 → 构建 → 打包）

```powershell
cd e:\develop\mall
git checkout <分支名>            # 默认 mall 跳过
npm run build
Compress-Archive -Path dist\* -DestinationPath <SITE>-deploy.zip -Force
```

### 服务器三连（验证 → 解压 → 部署）

```bash
SITE=<填商城名>

ls -la ~/$SITE-deploy.zip   # 必须先确认文件存在

mkdir -p /tmp/$SITE-deploy && unzip -o ~/$SITE-deploy.zip -d /tmp/$SITE-deploy && sudo rm -rf /var/www/$SITE/* && sudo cp -r /tmp/$SITE-deploy/index.html /tmp/$SITE-deploy/assets /var/www/$SITE/ && sudo chown -R www-data:www-data /var/www/$SITE && rm -rf /tmp/$SITE-deploy ~/$SITE-deploy.zip && ls /var/www/$SITE
```

---

## 5. 多商城常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| `nginx -t` 报 `conflicting server name` | 两个 conf 用了同一个域名 | 改其中一个的 `server_name` |
| 域名能解析但访问到别的商城 | DNS 没生效 / Nginx 没 reload / server_name 写错 | `sudo nginx -T \| grep server_name` 看一下 |
| 上传错了商城（mall_1 zip 部署到 mall 了） | 命令里 `SITE` 写错 | 重新打包正确商城的 dist 上传覆盖 |
| 多个商城同时改主题，分支切来切去乱 | git 分支没切对 | 部署前 `git branch --show-current` 先确认 |

诊断命令清单：

```bash
sudo nginx -T | grep -E "server_name|root /var/www"   # 看所有站点对应关系
sudo nginx -t                                          # 检查 Nginx 配置语法
sudo systemctl reload nginx                            # 改配置后软重载
ls /var/www/                                           # 看现有的所有 mall_*

curl -I -H "Host: pet.nengzhan.xyz" http://127.0.0.1   # 服务器内部自测
```

---

## 6. 回滚

部署翻车了想回上一版：

```powershell
git log --oneline -5                       # 找上一个能用的 commit
git checkout <commit-hash>
npm run build
Compress-Archive -Path dist\* -DestinationPath <SITE>-deploy.zip -Force
# 上传 + 跑 §3.4 部署命令
git checkout <你刚才的分支>                  # 回到 HEAD
```

如果想要服务器端有备份能秒退，把 §3.4 的部署命令换成下面这版（保留旧版到 `<SITE>.bak`）：

```bash
SITE=mall_1
mkdir -p /tmp/$SITE-deploy
unzip -o ~/$SITE-deploy.zip -d /tmp/$SITE-deploy

sudo rm -rf /var/www/$SITE.bak
sudo mv /var/www/$SITE /var/www/$SITE.bak
sudo mkdir -p /var/www/$SITE
sudo cp -r /tmp/$SITE-deploy/index.html /tmp/$SITE-deploy/assets /var/www/$SITE/
sudo chown -R www-data:www-data /var/www/$SITE

rm -rf /tmp/$SITE-deploy ~/$SITE-deploy.zip
```

秒退一行：

```bash
SITE=mall_1
sudo rm -rf /var/www/$SITE && sudo mv /var/www/$SITE.bak /var/www/$SITE
```

---

## 7. 写在最后

每次新加一个商城，**记得回到 §0 把表格更新一下**——这是你后期最快查清楚 "mall_3 是哪个域名" 的地方，比翻 Nginx 配置快多了。

未来想再省事，可以做一个 `deploy.ps1` 脚本读取参数 `-Site mall_1`，一行命令本地构建 + scp 上传 + 服务器解压。需要的时候说一声。

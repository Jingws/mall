# 悠选商城 (H5 Mall)

一个纯静态的 H5 移动端商城 Demo，使用 **React 18 + Vite + TypeScript + React Router** 构建。
不依赖任何后端接口、不需要登录注册、不对接任何支付，全流程在前端通过模拟数据走通。

## 功能一览

- 🏠 **首页**：轮播 Banner、快捷分类入口、商品搜索、瀑布流商品列表
- 🗂️ **分类页**：左侧分类导航 + 右侧商品列表
- 📦 **商品详情**：渐变大图、价格、卖点、SKU 弹层（规格 + 数量）
- 🛒 **购物车**：勾选、增减、删除、全选、合计
- 📝 **确认订单**：地址、商品、配送、支付方式（微信 / 支付宝 / 银行卡）
- ✅ **支付成功**：模拟支付结果，跳转订单或继续逛逛
- 👤 **我的**：用户信息、订单入口、常用功能
- 📜 **订单列表**：本地保存的历史订单，下次打开仍在

> 购物车与订单数据通过 `localStorage` 持久化，刷新页面不会丢失。

## 快速开始

```bash
# 安装依赖（建议 Node 18+）
npm install

# 启动开发服务（默认 http://localhost:5173）
npm run dev

# 构建生产版本
npm run build

# 本地预览构建产物
npm run preview
```

启动后用手机扫码或浏览器开 **DevTools 移动设备模式**（推荐 iPhone 12/14 Pro 尺寸）查看效果。

## 模板化（一份代码 N 个商城）

本项目把所有差异化内容集中到 `src/config/` 下，新建分支只改这 3 个文件即可派生出新商城：

```
src/config/
├── site.ts       # 品牌、主题色、虚拟用户、文案
├── banners.ts    # 首页轮播
└── products.ts   # 商品 + 分类
```

主题色会在运行时注入到 CSS 变量，**改一行 `theme.primary`，全站自动换肤**。

## 部署到服务器

完整部署手册见 [`deploy/DEPLOY.md`](./deploy/DEPLOY.md)，覆盖：

- 如何 fork 一个新商城分支
- 如何把 `mall / mall_1 / mall_2 ...` 部署到同一台机器的不同目录、不同域名
- 一份命令模板适配所有商城（替换变量即可）
- 首次部署、日常更新、回滚、排错

## 目录结构

```
src/
├── config/          # 站点 / 主题 / 商品 / Banner 配置（差异化层）
├── components/      # 通用组件（NavBar、TabBar、ProductImage、Toast）
├── pages/           # 各路由页面
├── store/           # 购物车 + 订单状态（Context + localStorage）
├── styles/          # 全局样式（颜色全部走 CSS 变量）
├── App.tsx          # 路由与布局
└── main.tsx         # 应用入口（注入主题、设置 title）
```

## 设计说明

- **商品图片**：使用 Unsplash CDN 的实物图，加载失败会自动回退到 emoji + 渐变色作占位。
- **路由**：使用 `HashRouter`，可直接 `npm run build` 丢到任意静态服务器即可访问，刷新不会 404。
- **移动端适配**：最大宽度 480px 居中显示，桌面端打开依然有移动端的视觉体验。

Enjoy shopping! 🛍️

# 星野潮玩 STARFIELD · H5 Mall (Cyberpunk HUD 模板)

一个**暗黑赛博朋克 HUD 风格**的 H5 移动端商城 Demo，使用 **React 18 + Vite + TypeScript + React Router** 构建。
不依赖任何后端接口、不需要登录注册、不对接任何支付，全流程在前端通过模拟数据走通。

> 本项目同时是一份**模板**：所有差异化内容（品牌名、主题色、商品、Banner）集中在 `src/config/`，
> 改 3 个文件即可派生出风格完全不同的下一个商城。

## 功能一览

- 首页：HUD 风顶栏（品牌印章 + 在线状态 + 终端式搜索）、霓虹切角 Banner、横向分类 chips、Curated drop、网格商品列表
- 分类：顶部水平 chip 标签栏 + 2 列暗色切角卡片网格（替代传统左右分栏）
- 商品详情：满屏渐变 hero + SKU 序列号、霓虹规格表 + HUD 底部双 CTA
- 购物车：暗色切角卡片 + 浮动胶囊结算栏
- 结算：HUD 卡片 + 等宽字体行、电光支付选项
- 支付成功：HUD 终端式 `TRANSACTION OK` + ASCII art 回执
- 我的：`PILOT-ID` 玻璃卡 + 4 项任务统计 + 线性菜单
- 订单：暗黑切角卡片 + 单色霓虹状态 chip
- 收货地址：终端表单（`> recipient` `> phone` `> delivery point`）

> 购物车与订单数据通过 `localStorage` 持久化。

## 快速开始

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
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
模板级布局（暗黑 HUD / 浅色暖色等）则通过 `src/styles/index.css` 与 `src/components/` 控制。

## 部署到服务器

完整部署手册见 [`deploy/DEPLOY.md`](./deploy/DEPLOY.md)。

## 目录结构

```
src/
├── config/          # 站点 / 主题 / 商品 / Banner 配置（差异化层）
├── components/      # 通用组件（Icon / NavBar / TabBar / ProductImage / Toast）
├── pages/           # 各路由页面
├── store/           # 购物车 + 订单状态（Context + localStorage）
├── styles/          # 全局样式（暗黑 HUD，颜色全部走 CSS 变量）
├── App.tsx          # 路由与布局
└── main.tsx         # 应用入口（注入主题、设置 title）
```

## 设计说明

- **整体语言**：深紫黑底 + 霓虹紫青 + 切角卡片 + `//` 注释式区块标题 + 等宽字号显示价格 / ID / 状态
- **图标**：自研 30+ SVG 线性图标（`src/components/Icon.tsx`）替代 emoji
- **TabBar**：浮动胶囊，活跃项有顶部霓虹高光条
- **商品图片**：使用 Unsplash CDN 实物图，加载失败自动回退到 emoji + 渐变占位
- **路由**：`HashRouter`，`npm run build` 后丢到任意静态服务器即可访问，刷新不会 404
- **移动端适配**：最大宽度 480px 居中显示

Power on. Engage.

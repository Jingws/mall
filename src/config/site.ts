/**
 * 站点级配置：品牌、主题、虚拟用户、文案
 * 新建一个分支做新商城时，只需要改这个文件 + products.ts + banners.ts。
 */

export interface SiteConfig {
  brand: {
    /** 短品牌名，TabBar/header logo 用，如 "悠选" */
    name: string
    /** 完整品牌名，"我的"页脚等用，如 "悠选商城" */
    fullName: string
    /** 一句话 slogan，如 "让购物变简单" */
    slogan: string
    /** 浏览器 tab 标题 */
    title: string
  }

  /**
   * 主题色：会在运行时注入到 CSS 变量。
   * 改完颜色，整站 UI 自动换肤。
   */
  theme: {
    /** 主色，最显眼的 brand 色 */
    primary: string
    /** 主色加深款，用于 hover/active */
    primaryDark: string
    /** 辅色，用于"加入购物车"等次要按钮 */
    accent: string
    /** 主按钮渐变 */
    primaryGradient: string
    /** 辅按钮渐变（加入购物车 / SKU cart 按钮） */
    accentGradient: string
    /** 顶部 Header 渐变（首页搜索栏背景） */
    headerGradient: string
    /** "我的"页 profile 顶部渐变 */
    profileGradient: string
    /** 主按钮投影色（半透明） */
    primaryShadow: string
    /** 支付成功页 ✓ 圆圈渐变 */
    successGradient: string
  }

  /** 假数据：虚拟用户，给"我的""下单地址"等页面用 */
  user: {
    name: string
    phone: string
    address: string
    avatarChar: string
    vipLevel: string
    userId: string
  }

  /** 商品详情页"服务承诺"小字 */
  services: string[]

  /** 店铺名（结算页 / 订单页显示） */
  shop: {
    name: string
  }

  /** "我的"页底部 footer 文案 */
  pageFooter: string
}

export const siteConfig: SiteConfig = {
  brand: {
    name: '悠选',
    fullName: '悠选商城',
    slogan: '让购物变简单',
    title: '悠选商城',
  },
  theme: {
    primary: '#ff4d4f',
    primaryDark: '#d9363e',
    accent: '#ffa940',
    primaryGradient: 'linear-gradient(135deg, #ff7875, #ff4d4f)',
    accentGradient: 'linear-gradient(135deg, #ffc069, #ffa940)',
    headerGradient: 'linear-gradient(180deg, #ff4d4f 0%, #ff7a7a 100%)',
    profileGradient: 'linear-gradient(135deg, #ff7875 0%, #ff4d4f 100%)',
    primaryShadow: 'rgba(255, 77, 79, 0.3)',
    successGradient: 'linear-gradient(135deg, #52c41a, #389e0d)',
  },
  user: {
    name: '张小悠',
    phone: '138 **** 8888',
    address: '上海市 黄浦区 世纪大道 100 号 12 栋 3 单元',
    avatarChar: '悠',
    vipLevel: 'VIP1',
    userId: '8888 8888',
  },
  services: ['· 顺丰包邮', '· 七天无理由', '· 假一赔十'],
  shop: {
    name: '悠选官方旗舰店',
  },
  pageFooter: '— 悠选商城 · 让购物变简单 —',
}

/**
 * 把主题对象注入到 :root 的 CSS 变量上。
 * 在 main.tsx 启动时调用一次。
 */
export function applyTheme(theme: SiteConfig['theme']) {
  const root = document.documentElement
  const map: Record<keyof SiteConfig['theme'], string> = {
    primary: '--primary',
    primaryDark: '--primary-dark',
    accent: '--accent',
    primaryGradient: '--primary-gradient',
    accentGradient: '--accent-gradient',
    headerGradient: '--header-gradient',
    profileGradient: '--profile-gradient',
    primaryShadow: '--primary-shadow',
    successGradient: '--success-gradient',
  }
  ;(Object.keys(map) as Array<keyof SiteConfig['theme']>).forEach((key) => {
    root.style.setProperty(map[key], theme[key])
  })

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (meta) meta.content = theme.primary
}

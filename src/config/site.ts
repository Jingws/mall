/**
 * 站点级配置：品牌、主题、虚拟用户、文案
 * 新建一个分支做新商城时，只需要改这个文件 + products.ts + banners.ts。
 */

export interface SiteConfig {
  brand: {
    /** 短品牌名，TabBar/header logo 用，如 "星野" */
    name: string
    /** 完整品牌名，"我的"页脚等用，如 "星野潮玩" */
    fullName: string
    /** 一句话 slogan，如 "重启你的次元" */
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
    name: '星野',
    fullName: '星野潮玩',
    slogan: '重启你的次元',
    title: '星野 · 潮玩黑科技',
  },
  theme: {
    primary: '#a855f7',
    primaryDark: '#7e22ce',
    accent: '#06ffd5',
    primaryGradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    accentGradient: 'linear-gradient(135deg, #06ffd5 0%, #00b4ff 100%)',
    headerGradient: 'linear-gradient(135deg, #1a0033 0%, #4c1d95 55%, #831843 100%)',
    profileGradient: 'linear-gradient(135deg, #1a0033 0%, #4c1d95 50%, #be185d 100%)',
    primaryShadow: 'rgba(168, 85, 247, 0.45)',
    successGradient: 'linear-gradient(135deg, #06ffd5 0%, #00b4ff 100%)',
  },
  user: {
    name: '林夜',
    phone: '159 **** 0721',
    address: '深圳市 南山区 科技园南区 9 号楼 22F · 量子工位',
    avatarChar: '夜',
    vipLevel: 'PRO',
    userId: 'NX-2077',
  },
  services: ['· 极速发货', '· 30 天质保', '· 假一赔三'],
  shop: {
    name: '星野官方实验室',
  },
  pageFooter: '— 星野潮玩 · 重启你的次元 —',
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

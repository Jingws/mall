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
    name: '野趣',
    fullName: '野趣户外',
    slogan: '去拥抱旷野',
    title: '野趣户外 · 去拥抱旷野',
  },
  theme: {
    primary: '#2d6a4f',
    primaryDark: '#1b4332',
    accent: '#fb923c',
    primaryGradient: 'linear-gradient(135deg, #52b788, #2d6a4f)',
    accentGradient: 'linear-gradient(135deg, #fdba74, #fb923c)',
    headerGradient: 'linear-gradient(180deg, #2d6a4f 0%, #52b788 100%)',
    profileGradient: 'linear-gradient(135deg, #52b788 0%, #1b4332 100%)',
    primaryShadow: 'rgba(45, 106, 79, 0.35)',
    successGradient: 'linear-gradient(135deg, #52c41a, #2d6a4f)',
  },
  user: {
    name: '陈野行',
    phone: '155 **** 6688',
    address: '杭州市 西湖区 龙井路 莫干山营地 7 号车位',
    avatarChar: '野',
    vipLevel: '探险家',
    userId: '8848 1314',
  },
  services: ['· 全国包邮', '· 7 天试用退换', '· 终身质保'],
  shop: {
    name: '野趣户外官方旗舰店',
  },
  pageFooter: '— 野趣户外 · 去拥抱旷野 —',
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

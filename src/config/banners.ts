/**
 * 首页轮播 Banner 配置
 */
export interface Banner {
  title: string
  sub: string
  bg: string
  emoji: string
}

export const banners: Banner[] = [
  {
    title: '海边露营季',
    sub: '帐篷天幕组合限时 85 折',
    bg: 'linear-gradient(120deg,#0c4a6e 0%,#0ea5e9 55%,#2dd4bf 100%)',
    emoji: '🏕️',
  },
  {
    title: '冲浪生活方式',
    sub: '速干穿搭与防水装备上新',
    bg: 'linear-gradient(120deg,#164e63 0%,#0891b2 50%,#f97316 100%)',
    emoji: '🏄',
  },
  {
    title: '城市海盐美学',
    sub: '厨房器具与香氛家居同频焕新',
    bg: 'linear-gradient(120deg,#155e75 0%,#2dd4bf 50%,#fb7185 100%)',
    emoji: '🫧',
  },
]

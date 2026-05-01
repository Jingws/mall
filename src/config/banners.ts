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
    title: '黑色游戏季',
    sub: '装备整套立减 500 起',
    bg: 'linear-gradient(120deg,#1a0033 0%,#4c1d95 50%,#831843 100%)',
    emoji: '🎮',
  },
  {
    title: '机甲新品发售',
    sub: '十二月限定 · 全球编号 999',
    bg: 'linear-gradient(120deg,#0f172a 0%,#1e3a8a 50%,#06ffd5 100%)',
    emoji: '🤖',
  },
  {
    title: '桌搭工位 ALL-IN-ONE',
    sub: '一站式打造你的赛博工位',
    bg: 'linear-gradient(120deg,#831843 0%,#a855f7 50%,#06ffd5 100%)',
    emoji: '💻',
  },
]

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
    title: '黄金露营季',
    sub: '满 999 减 200，出发吧',
    bg: 'linear-gradient(120deg,#1b4332 0%,#2d6a4f 50%,#74c69d 100%)',
    emoji: '🏕️',
  },
  {
    title: '夜空满月限定',
    sub: '营地灯立减 ¥80',
    bg: 'linear-gradient(120deg,#1e3a5f 0%,#2d6a4f 100%)',
    emoji: '🌙',
  },
  {
    title: '70L 登山包早鸟价',
    sub: '专业徒步装备 8 折起',
    bg: 'linear-gradient(120deg,#e9c46a 0%,#f4a261 100%)',
    emoji: '🎒',
  },
]

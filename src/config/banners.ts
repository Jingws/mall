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
    title: '城市徒步周',
    sub: '轻量机能装备限时 7 折起',
    bg: 'linear-gradient(120deg,#1c1917 0%,#365314 55%,#14532d 100%)',
    emoji: '🥾',
  },
  {
    title: '露营新季上线',
    sub: '模块化营地系统一站配齐',
    bg: 'linear-gradient(120deg,#111827 0%,#0f766e 50%,#22c55e 100%)',
    emoji: '⛺',
  },
  {
    title: '机能通勤计划',
    sub: '防泼水背包 + 速干穿搭组合价',
    bg: 'linear-gradient(120deg,#374151 0%,#65a30d 50%,#f59e0b 100%)',
    emoji: '🎒',
  },
]

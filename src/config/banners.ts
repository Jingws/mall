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
    title: '春季焕新季',
    sub: '全场满 199 减 30',
    bg: 'linear-gradient(120deg,#ff9a9e 0%,#fad0c4 50%,#fbc2eb 100%)',
    emoji: '🌸',
  },
  {
    title: '数码爆款日',
    sub: '降噪耳机 ¥899 起',
    bg: 'linear-gradient(120deg,#667eea 0%,#764ba2 100%)',
    emoji: '🎧',
  },
  {
    title: '美食生鲜',
    sub: '当季新米直降 31%',
    bg: 'linear-gradient(120deg,#fddb92 0%,#d1fdff 100%)',
    emoji: '🍚',
  },
]

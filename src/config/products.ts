/**
 * 商品配置：商品列表、分类
 *
 * 新建分支做新商城时，把这里整体替换成新的 SKU 即可。
 * 如果暂时不想动，仅修改 name/price/desc 等也能立刻看到效果。
 */

export interface Product {
  id: number
  name: string
  desc: string
  price: number
  origin: number
  /** 加载失败时的兜底 emoji */
  emoji: string
  /** 加载失败时的兜底渐变背景 */
  gradient: string
  /** 真实商品图 URL */
  image: string
  tag: string
  category: string
  sales: number
  detail: string[]
}

const UNSPLASH = (id: string, w = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${w}&fit=crop&auto=format&q=75`

export const categories = [
  { id: 'all', name: '全部', emoji: '✨' },
  { id: 'gear', name: '电竞装备', emoji: '🎮' },
  { id: 'toy', name: '潮玩手办', emoji: '🤖' },
  { id: 'audio', name: '声学', emoji: '🎧' },
  { id: 'light', name: '灯效桌搭', emoji: '💡' },
  { id: 'mech', name: '机械键鼠', emoji: '⌨️' },
] as const

export const products: Product[] = [
  {
    id: 1,
    name: '赤焰客制化机械键盘 K8',
    desc: '75% 配列 · 三模 · gasket 结构',
    price: 1299,
    origin: 1899,
    emoji: '⌨️',
    gradient: 'linear-gradient(135deg,#1a0033 0%,#a855f7 100%)',
    image: UNSPLASH('1587829741301-dc798b83add3'),
    tag: '限定',
    category: 'mech',
    sales: 8421,
    detail: [
      '75% 紧凑配列，桌面留白更多',
      '蓝牙 5.3 + 2.4G + 有线三模无缝切换',
      'Gasket 结构 · 五层填充，敲击如踩棉',
      '热插拔轴座，自由换线性 / 段落 / 茶轴',
    ],
  },
  {
    id: 2,
    name: '暗夜行者 RGB 游戏鼠标',
    desc: '8K 回报率 · 26000 DPI 旗舰光学',
    price: 599,
    origin: 899,
    emoji: '🖱️',
    gradient: 'linear-gradient(135deg,#0f172a 0%,#06ffd5 100%)',
    image: UNSPLASH('1527814050087-3793815479db'),
    tag: '爆款',
    category: 'gear',
    sales: 6213,
    detail: [
      'PAW3950 光学引擎，26000 DPI / 750 IPS',
      '8000Hz 极致回报率，FPS 选手指定配置',
      '光磁微动 1 亿次寿命，不会双击',
      '单手 58g 超轻镂空，灵活到飞起',
    ],
  },
  {
    id: 3,
    name: '赛博 2049 盲盒套装',
    desc: '12 款全收集 · 含隐藏款',
    price: 459,
    origin: 720,
    emoji: '📦',
    gradient: 'linear-gradient(135deg,#831843 0%,#ec4899 100%)',
    image: UNSPLASH('1559757175-7cb056fba93d'),
    tag: '隐藏款',
    category: 'toy',
    sales: 9182,
    detail: [
      '原创 IP「赛博 2049」第三弹，整套 12 款',
      '隐藏款抽中概率 1/144，编号防伪',
      '高质 PVC + 软胶眼罩，做工硬核',
      '官方授权独家发售，收藏增值首选',
    ],
  },
  {
    id: 4,
    name: '星河降噪耳机 N3 Pro',
    desc: '主动降噪 -48dB · LDAC 无损',
    price: 1099,
    origin: 1499,
    emoji: '🎧',
    gradient: 'linear-gradient(135deg,#4c1d95 0%,#06ffd5 100%)',
    image: UNSPLASH('1505740420928-5e560c06d30e'),
    tag: '旗舰',
    category: 'audio',
    sales: 4527,
    detail: [
      '行业天花板 -48dB 主动降噪',
      'LDAC + Hi-Res Wireless 双金标',
      '40h 续航，支持低延迟游戏模式',
      '单元 50mm 镀铍振膜，三频分离',
    ],
  },
  {
    id: 5,
    name: '全息像素灯 Pixel Cube',
    desc: '智能联动 · 1600 万色像素屏',
    price: 359,
    origin: 599,
    emoji: '🟪',
    gradient: 'linear-gradient(135deg,#a855f7 0%,#ec4899 100%)',
    image: UNSPLASH('1531297484001-80022131f5a1'),
    tag: '网红',
    category: 'light',
    sales: 7890,
    detail: [
      '16×16 RGB 像素阵列，百万种动画',
      '配套 APP 自定义图案、文字、像素画',
      '支持音乐节奏 / 屏幕色 / Hue 联动',
      '磁吸拼接，多块组合更带感',
    ],
  },
  {
    id: 6,
    name: '机甲战士 1/12 可动手办',
    desc: '32 处可动 · 全球限量编号',
    price: 689,
    origin: 999,
    emoji: '🤖',
    gradient: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%)',
    image: UNSPLASH('1608889335941-32ac5f2041b9'),
    tag: '收藏',
    category: 'toy',
    sales: 1438,
    detail: [
      '原创设计「VEGA-7」机甲，1/12 比例',
      '32 处关节可动，重现各种战斗 pose',
      '电镀甲片 + 喷涂旧化，细节拉满',
      '附赠武器 5 件、底座 1 件、限量编号卡',
    ],
  },
  {
    id: 7,
    name: '量子电竞椅 Pro Max',
    desc: '4D 扶手 · 太空记忆棉',
    price: 2399,
    origin: 3499,
    emoji: '🪑',
    gradient: 'linear-gradient(135deg,#1a0033 0%,#831843 100%)',
    image: UNSPLASH('1598550476439-6847785fcea6'),
    tag: '旗舰',
    category: 'gear',
    sales: 1102,
    detail: [
      '人体工学曲面，腰托精准托腰',
      '4D 扶手 · 165° 无极后仰',
      '太空记忆棉坐垫，10 小时不累',
      'Class-4 防爆气压杆，承重 200kg',
    ],
  },
  {
    id: 8,
    name: '磁吸 RGB 接线板 Pro',
    desc: '6 位独立开关 · 灯光同步',
    price: 199,
    origin: 299,
    emoji: '🔌',
    gradient: 'linear-gradient(135deg,#06ffd5 0%,#a855f7 100%)',
    image: UNSPLASH('1614624532983-4ce03382d63d'),
    tag: '新品',
    category: 'light',
    sales: 5630,
    detail: [
      '6 位独立开关 + 4USB 快充',
      '内置 RGB 灯带，与桌面灯效同步',
      '磁吸背贴，桌底走线干净利落',
      '过载 / 过压 / 雷击三重保护',
    ],
  },
]

export const findProduct = (id: number) => products.find((p) => p.id === id)

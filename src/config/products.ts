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
  { id: 'tent', name: '帐篷', emoji: '⛺' },
  { id: 'sleep', name: '睡具', emoji: '🛌' },
  { id: 'light', name: '照明', emoji: '🔦' },
  { id: 'cook', name: '炊具', emoji: '🔥' },
  { id: 'pack', name: '背包', emoji: '🎒' },
  { id: 'shoes', name: '鞋履', emoji: '🥾' },
  { id: 'wear', name: '服饰', emoji: '🧥' },
] as const

export const products: Product[] = [
  {
    id: 1,
    name: '极光双人户外帐篷',
    desc: '双层防风 · 三季通用',
    price: 689,
    origin: 1099,
    emoji: '⛺',
    gradient: 'linear-gradient(135deg,#b8e0d2 0%,#52b788 100%)',
    image: UNSPLASH('1504280390367-361c6d9f38f4'),
    tag: '热销',
    category: 'tent',
    sales: 6280,
    detail: [
      '210T 涤纶涂硅，PU3000mm 防雨指数',
      '双门双窗，对流通风不闷热',
      '玻纤帐杆 + 高强地钉，扛得住 7 级风',
      '收纳后仅一个登山包大小，单手拎上车',
    ],
  },
  {
    id: 2,
    name: '寒地羽绒睡袋 -10℃',
    desc: '90% 鸭绒 · 木乃伊版',
    price: 459,
    origin: 799,
    emoji: '🛌',
    gradient: 'linear-gradient(135deg,#a7c5eb 0%,#5e8b9b 100%)',
    image: UNSPLASH('1487730116645-74489c95b41b'),
    tag: '过冬必备',
    category: 'sleep',
    sales: 3120,
    detail: [
      '舒适温度 -5℃，极限温度 -10℃',
      '90% 白鸭绒填充，蓬松度 600+',
      '木乃伊版型，肩颈防风领设计',
      '附压缩袋，体积小一半好打包',
    ],
  },
  {
    id: 3,
    name: '营地氛围 LED 提灯',
    desc: '4 档调光 · 长续航',
    price: 129,
    origin: 199,
    emoji: '🔦',
    gradient: 'linear-gradient(135deg,#fff3b0 0%,#f6c23e 100%)',
    image: UNSPLASH('1486649961855-75838619c131'),
    tag: '氛围爆款',
    category: 'light',
    sales: 12480,
    detail: [
      '4 档亮度，最高 320 流明照亮整个营地',
      '8000mAh 大电池，最低档可点亮 80 小时',
      '复古暖光，营地照片自带电影感',
      'IPX4 防水，下点小雨不慌',
    ],
  },
  {
    id: 4,
    name: '便携卡式燃气炉',
    desc: '一键点火 · 防风炉头',
    price: 198,
    origin: 358,
    emoji: '🔥',
    gradient: 'linear-gradient(135deg,#ffb4a2 0%,#e5989b 100%)',
    image: UNSPLASH('1623244309892-23dd55d3f3e0'),
    tag: '直降',
    category: 'cook',
    sales: 4391,
    detail: [
      '电子脉冲点火，旋钮一拧即燃',
      '黄铜防风炉头，山顶大风也能稳烧',
      '配硬质收纳箱，叠装不占行李',
      '兼容市面 95% 的卡式气罐',
    ],
  },
  {
    id: 5,
    name: '70L 登山徒步背包',
    desc: '透气背负 · 多分仓',
    price: 528,
    origin: 899,
    emoji: '🎒',
    gradient: 'linear-gradient(135deg,#e9c46a 0%,#f4a261 100%)',
    image: UNSPLASH('1553062407-98eeb64c6a62'),
    tag: '新品',
    category: 'pack',
    sales: 1869,
    detail: [
      '70L 主仓 + 5 个独立分仓，装备分得清清楚楚',
      'AirFlex 透气背板，长途负重不闷汗',
      '腰封承重设计，把重量从肩膀转到髋部',
      '附防雨罩，下雨能护住装备',
    ],
  },
  {
    id: 6,
    name: '防水高帮登山鞋',
    desc: 'GTX 防水 · Vibram 大底',
    price: 698,
    origin: 1099,
    emoji: '🥾',
    gradient: 'linear-gradient(135deg,#cdb380 0%,#8a6e4f 100%)',
    image: UNSPLASH('1542838132-92c53300491e'),
    tag: '专业',
    category: 'shoes',
    sales: 2754,
    detail: [
      'GORE-TEX 内衬，全天踩水不进水',
      'Vibram 黄金大底，湿滑岩面也抓得住',
      '高帮支撑保护脚踝，下山不崴脚',
      'EVA 中底缓震，长线徒步脚不累',
    ],
  },
  {
    id: 7,
    name: '钛合金折叠餐具套组',
    desc: '钛刀叉勺 · 仅 95g',
    price: 168,
    origin: 268,
    emoji: '🍴',
    gradient: 'linear-gradient(135deg,#d4d4d4 0%,#6b7280 100%)',
    image: UNSPLASH('1583394838336-acd977736f90'),
    tag: '轻量',
    category: 'cook',
    sales: 5318,
    detail: [
      '航空级钛合金，不锈不染味',
      '折叠收纳，整套仅 95g',
      '刀叉勺三件套 + 收纳袋',
      '抗腐蚀，洗一冲就干净',
    ],
  },
  {
    id: 8,
    name: '速干战术冲锋衣',
    desc: '三防硬壳 · 春夏季',
    price: 459,
    origin: 799,
    emoji: '🧥',
    gradient: 'linear-gradient(135deg,#95a99c 0%,#4a6741 100%)',
    image: UNSPLASH('1551028719-00167b16eac5'),
    tag: '春夏新款',
    category: 'wear',
    sales: 2106,
    detail: [
      '三层复合面料，防风、防泼水、抗撕裂',
      '腋下双向拉链通风口，热了拉开秒透气',
      '可收帽设计，登顶时不挡视线',
      '修身剪裁，城市穿搭也撑得住',
    ],
  },
]

export const findProduct = (id: number) => products.find((p) => p.id === id)

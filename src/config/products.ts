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
  { id: 'camp', name: '海边露营', emoji: '🏕️' },
  { id: 'wear', name: '速干穿搭', emoji: '🩳' },
  { id: 'kitchen', name: '岛屿厨房', emoji: '🍳' },
  { id: 'fragrance', name: '香氛家居', emoji: '🕯️' },
  { id: 'water', name: '海上运动', emoji: '🏄' },
] as const

export const products: Product[] = [
  {
    id: 1,
    name: '潮汐轻幕天幕套组',
    desc: '防晒涂银布 · 一拉即开',
    price: 899,
    origin: 1299,
    emoji: '🏕️',
    gradient: 'linear-gradient(135deg,#0c4a6e 0%,#2dd4bf 100%)',
    image: UNSPLASH('1504280390368-3971d3a9f5d8'),
    tag: '爆款',
    category: 'camp',
    sales: 5128,
    detail: [
      '涂银牛津布，烈日下也能稳定遮阳',
      '双立柱结构，单人 3 分钟完成搭建',
      '配套地钉与风绳，海风天也更稳固',
      '附加边布可选，打造私密露营空间',
    ],
  },
  {
    id: 2,
    name: '海风速干衬衫 Air-Lite',
    desc: 'UPF50+ · 四向弹力',
    price: 369,
    origin: 499,
    emoji: '👕',
    gradient: 'linear-gradient(135deg,#155e75 0%,#0ea5e9 100%)',
    image: UNSPLASH('1521572163474-6864f9cf17ab'),
    tag: '新品',
    category: 'wear',
    sales: 4380,
    detail: [
      '速干纤维面料，汗湿后快速恢复干爽',
      'UPF50+ 抗晒，长时间户外更安心',
      '四向弹力剪裁，活动幅度更自由',
      '抗皱易打理，出差旅行一件搞定',
    ],
  },
  {
    id: 3,
    name: '珊瑚便携卡式炉 Pro',
    desc: '2200W 火力 · 防风炉头',
    price: 299,
    origin: 429,
    emoji: '🍳',
    gradient: 'linear-gradient(135deg,#1f2937 0%,#f97316 100%)',
    image: UNSPLASH('1495474472287-4d71bcdd2085'),
    tag: '人气',
    category: 'kitchen',
    sales: 6904,
    detail: [
      '2200W 直喷火力，煎烤炖煮都稳定',
      '防风聚焰炉头，海边环境也能高效烹饪',
      '双重防漏气结构，使用更安心',
      '折叠收纳设计，后备箱不占空间',
    ],
  },
  {
    id: 4,
    name: '潮声香氛蜡烛礼盒',
    desc: '海盐鼠尾草 · 40h 燃烧',
    price: 189,
    origin: 269,
    emoji: '🕯️',
    gradient: 'linear-gradient(135deg,#0f766e 0%,#fb7185 100%)',
    image: UNSPLASH('1603006905393-46f8f1aaf7d8'),
    tag: '礼物',
    category: 'fragrance',
    sales: 8245,
    detail: [
      '海盐 + 鼠尾草复合香，清新不甜腻',
      '植物蜡基，燃烧更纯净更持久',
      '单杯可持续约 40 小时',
      '磨砂杯体可二次利用做收纳杯',
    ],
  },
  {
    id: 5,
    name: '漂流防水挎包 6L',
    desc: 'IPX7 防护 · 快拆肩带',
    price: 259,
    origin: 369,
    emoji: '🎒',
    gradient: 'linear-gradient(135deg,#082f49 0%,#22d3ee 100%)',
    image: UNSPLASH('1516728778615-2d590ea1856f'),
    tag: '必备',
    category: 'water',
    sales: 5782,
    detail: [
      'IPX7 级防水，浪花与骤雨都不怕',
      '卷口式密封结构，长时间防渗更可靠',
      '6L 容量适配手机钱包与随身相机',
      '可拆卸肩带，斜挎手提自由切换',
    ],
  },
  {
    id: 6,
    name: '流线冲浪短板 5.8',
    desc: 'EPS 轻芯 · 双层玻纤',
    price: 2399,
    origin: 3199,
    emoji: '🏄',
    gradient: 'linear-gradient(135deg,#164e63 0%,#0ea5e9 100%)',
    image: UNSPLASH('1502680390469-be75c86b636f'),
    tag: '旗舰',
    category: 'water',
    sales: 1206,
    detail: [
      'EPS 轻芯板坯，浮力更好起乘更轻松',
      '双层玻纤包裹，兼顾弹性与耐用',
      '小浪到中浪都能稳定输出速度感',
      '附赠脚绳与防滑蜡，新手也能快速上手',
    ],
  },
  {
    id: 7,
    name: '海岛珐琅锅 22cm',
    desc: '铸铁导热 · 一锅多用',
    price: 499,
    origin: 699,
    emoji: '🥘',
    gradient: 'linear-gradient(135deg,#334155 0%,#f97316 100%)',
    image: UNSPLASH('1601050690597-df0568f70950'),
    tag: '经典',
    category: 'kitchen',
    sales: 3517,
    detail: [
      '铸铁材质导热均匀，锁住食材原味',
      '珐琅内壁易清洁，不易串味',
      '适配明火 / 电磁炉 / 烤箱多场景',
      '炖煮焖烤一锅搞定，露营家用都合适',
    ],
  },
  {
    id: 8,
    name: '海盐扩香晶石套装',
    desc: '天然矿石 · 无火慢释香',
    price: 139,
    origin: 199,
    emoji: '🫧',
    gradient: 'linear-gradient(135deg,#0891b2 0%,#fb7185 100%)',
    image: UNSPLASH('1615529328331-f8917597711f'),
    tag: '氛围',
    category: 'fragrance',
    sales: 7689,
    detail: [
      '天然矿石颗粒，吸附精油后缓释留香',
      '无火设计，卧室与办公桌都可安心使用',
      '可替换香型补充液，长期使用成本更低',
      '极简玻璃器皿，轻松融入家居风格',
    ],
  },
]

export const findProduct = (id: number) => products.find((p) => p.id === id)

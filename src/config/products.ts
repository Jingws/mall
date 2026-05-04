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
  { id: 'pack', name: '背包收纳', emoji: '🎒' },
  { id: 'wear', name: '机能穿搭', emoji: '🧥' },
  { id: 'camp', name: '露营系统', emoji: '⛺' },
  { id: 'hydration', name: '水具炊具', emoji: '🥤' },
  { id: 'trail', name: '徒步配件', emoji: '🥾' },
] as const

export const products: Product[] = [
  {
    id: 1,
    name: '疾风通勤包 24L',
    desc: '防泼水 Cordura · 快拆胸扣',
    price: 699,
    origin: 999,
    emoji: '🎒',
    gradient: 'linear-gradient(135deg,#1f2937 0%,#365314 100%)',
    image: UNSPLASH('1500530855697-b586d89ba3ee'),
    tag: '热销',
    category: 'pack',
    sales: 6231,
    detail: [
      '24L 城市通勤黄金容量，短途出行一步到位',
      'Cordura 防泼水面料，轻雨天气无压力',
      '内置 16 寸电脑仓 + 多功能快取分区',
      '背板导流设计，夏天背负更透气',
    ],
  },
  {
    id: 2,
    name: '雾线冲锋衣 Shell-X',
    desc: '3L 复合面料 · 全压胶防水',
    price: 1299,
    origin: 1699,
    emoji: '🧥',
    gradient: 'linear-gradient(135deg,#111827 0%,#16a34a 100%)',
    image: UNSPLASH('1521572163474-6864f9cf17ab'),
    tag: '新品',
    category: 'wear',
    sales: 3180,
    detail: [
      '3L 复合防水面料，暴雨级防护',
      '全压胶工艺，关键拼缝不渗水',
      '腋下透气拉链，快速散热不闷汗',
      '帽檐一体成型，骑行视野更稳定',
    ],
  },
  {
    id: 3,
    name: '折叠露营桌 T2',
    desc: '铝合金骨架 · 30 秒展开',
    price: 459,
    origin: 699,
    emoji: '🪵',
    gradient: 'linear-gradient(135deg,#374151 0%,#65a30d 100%)',
    image: UNSPLASH('1523413651479-597eb2da0ad6'),
    tag: '轻量',
    category: 'camp',
    sales: 4275,
    detail: [
      '桌板耐刮抗污，户外使用更放心',
      '铝合金骨架仅重 2.9kg，女生也能单手提',
      '30 秒快速收展，搭营效率翻倍',
      '附带收纳袋，后备箱不占空间',
    ],
  },
  {
    id: 4,
    name: '钛金保温杯 800ml',
    desc: '双层真空 · 12h 保温',
    price: 199,
    origin: 269,
    emoji: '🥤',
    gradient: 'linear-gradient(135deg,#0f172a 0%,#0f766e 100%)',
    image: UNSPLASH('1523362628745-0c100150b504'),
    tag: '人气',
    category: 'hydration',
    sales: 10532,
    detail: [
      '304 不锈钢内胆，长效锁温',
      '广口杯嘴，冰块可直接放入',
      '食品级硅胶密封圈，倒置不漏',
      '手提挂环设计，徒步携带方便',
    ],
  },
  {
    id: 5,
    name: '远征登山杖 Carbon-Lite',
    desc: '碳纤维三节 · 外锁系统',
    price: 329,
    origin: 499,
    emoji: '🥾',
    gradient: 'linear-gradient(135deg,#1f2937 0%,#84cc16 100%)',
    image: UNSPLASH('1464822759023-fed622ff2c3b'),
    tag: '专业',
    category: 'trail',
    sales: 2849,
    detail: [
      '碳纤维杖身，减重同时保持强度',
      '三节可调，适配不同身高与地形',
      '钨钢杖尖，碎石路抓地更稳',
      'EVA 握把吸汗防滑，长途不磨手',
    ],
  },
  {
    id: 6,
    name: '模块化天幕 Canopy-M',
    desc: '抗撕裂涂银布 · 双杆快搭',
    price: 879,
    origin: 1199,
    emoji: '⛺',
    gradient: 'linear-gradient(135deg,#14532d 0%,#22c55e 100%)',
    image: UNSPLASH('1504280390368-3971d3a9f5d8'),
    tag: '旗舰',
    category: 'camp',
    sales: 1968,
    detail: [
      '150D 涂银牛津布，防晒指数 UPF50+',
      '双杆结构，单人可快速完成搭建',
      '支持侧墙扩展，遮阳挡风更灵活',
      '配套风绳地钉，强风环境更稳固',
    ],
  },
  {
    id: 7,
    name: '速干机能长裤 Trail-P',
    desc: '四向弹力 · DWR 防泼水',
    price: 429,
    origin: 629,
    emoji: '👖',
    gradient: 'linear-gradient(135deg,#111827 0%,#65a30d 100%)',
    image: UNSPLASH('1473966968600-fa801b869a1a'),
    tag: '通勤',
    category: 'wear',
    sales: 5320,
    detail: [
      '四向弹力面料，抬腿跨步更轻松',
      'DWR 防泼水处理，雨后速干不粘身',
      '立体剪裁膝部，徒步弯折无束缚',
      '多口袋收纳，手机钥匙分区放置',
    ],
  },
  {
    id: 8,
    name: '磁吸收纳包 Grid Pouch',
    desc: '模块分区 · 快速取放',
    price: 159,
    origin: 229,
    emoji: '🧰',
    gradient: 'linear-gradient(135deg,#374151 0%,#f59e0b 100%)',
    image: UNSPLASH('1514477917009-389c76a86b68'),
    tag: '入门',
    category: 'pack',
    sales: 7594,
    detail: [
      '内部可调隔板，灵活适配 EDC 装备',
      '磁吸快拆前袋，票据卡片单手可取',
      'YKK 拉链顺滑耐用，开合不易卡顿',
      '可外挂背包肩带，扩展收纳更高效',
    ],
  },
]

export const findProduct = (id: number) => products.find((p) => p.id === id)

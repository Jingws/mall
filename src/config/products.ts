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
  { id: 'phone', name: '数码', emoji: '📱' },
  { id: 'wear', name: '潮搭', emoji: '👟' },
  { id: 'home', name: '家居', emoji: '🛋️' },
  { id: 'food', name: '美食', emoji: '🍱' },
  { id: 'beauty', name: '美妆', emoji: '💄' },
] as const

export const products: Product[] = [
  {
    id: 1,
    name: '极光降噪耳机 Pro',
    desc: '40 小时续航 · 空间音频',
    price: 899,
    origin: 1299,
    emoji: '🎧',
    gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    image: UNSPLASH('1505740420928-5e560c06d30e'),
    tag: '爆款',
    category: 'phone',
    sales: 9821,
    detail: [
      '主动降噪深度可达 -42dB，让世界静下来',
      '40 小时长续航，10 分钟快充听 5 小时',
      '支持空间音频，沉浸感拉满',
      '人体工学设计，久戴不累',
    ],
  },
  {
    id: 2,
    name: '云感运动跑鞋',
    desc: '超轻缓震 · 透气网面',
    price: 359,
    origin: 599,
    emoji: '👟',
    gradient: 'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
    image: UNSPLASH('1542291026-7eec264c27ff'),
    tag: '新品',
    category: 'wear',
    sales: 5231,
    detail: [
      '专利缓震科技，每一步都像踩在云上',
      '超轻 PEBA 中底，单只重量仅 220g',
      '3D 飞织鞋面，透气不闷脚',
      '通勤、慢跑、健身都能 hold 住',
    ],
  },
  {
    id: 3,
    name: '轻语智能手表 S2',
    desc: '健康监测 · 双芯长续航',
    price: 1299,
    origin: 1599,
    emoji: '⌚',
    gradient: 'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)',
    image: UNSPLASH('1523275335684-37898b6baf30'),
    tag: '热销',
    category: 'phone',
    sales: 3492,
    detail: [
      '24 小时心率、血氧、压力监测',
      '双芯架构，续航长达 14 天',
      '1.43 英寸 AMOLED 高清屏',
      '支持 100+ 运动模式',
    ],
  },
  {
    id: 4,
    name: '原木风懒人沙发',
    desc: '可拆洗 · 北欧风格',
    price: 1599,
    origin: 2299,
    emoji: '🛋️',
    gradient: 'linear-gradient(135deg,#fddb92 0%,#d1fdff 100%)',
    image: UNSPLASH('1555041469-a586c61ea9bc'),
    tag: '直降',
    category: 'home',
    sales: 1208,
    detail: [
      '高密度回弹海绵，久坐不塌陷',
      '亲肤棉麻面料，可整体拆洗',
      '原木实木腿，承重稳固',
      '极简北欧风，百搭不挑客厅',
    ],
  },
  {
    id: 5,
    name: '日式精品米饭礼盒',
    desc: '当季新米 · 5kg 装',
    price: 89,
    origin: 129,
    emoji: '🍚',
    gradient: 'linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)',
    image: UNSPLASH('1547592180-85f173990554'),
    tag: '新鲜',
    category: 'food',
    sales: 12390,
    detail: [
      '东北当季新米，颗粒饱满有光泽',
      '一次蒸煮，米香四溢',
      '真空保鲜包装，锁住新鲜',
      '送父母、送朋友都倍儿有面',
    ],
  },
  {
    id: 6,
    name: '焕颜精华水乳套组',
    desc: '玻尿酸 · 烟酰胺',
    price: 268,
    origin: 458,
    emoji: '💧',
    gradient: 'linear-gradient(135deg,#fbc2eb 0%,#a6c1ee 100%)',
    image: UNSPLASH('1556228578-8c89e6adf883'),
    tag: '推荐',
    category: 'beauty',
    sales: 7820,
    detail: [
      '小分子玻尿酸，深层补水',
      '5% 烟酰胺，温和提亮肤色',
      '清爽不黏腻，敏感肌也能用',
      '水乳一套，护肤一步到位',
    ],
  },
  {
    id: 7,
    name: '便携蓝牙音响 mini',
    desc: '360° 环绕 · IPX7 防水',
    price: 199,
    origin: 299,
    emoji: '🔊',
    gradient: 'linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)',
    image: UNSPLASH('1608043152269-423dbba4e7e1'),
    tag: '热门',
    category: 'phone',
    sales: 4501,
    detail: [
      '双单元 360° 环绕音效',
      'IPX7 级防水，浴室派对随便造',
      '12 小时续航，户外出游必备',
      '小巧便携，颜值在线',
    ],
  },
  {
    id: 8,
    name: '法式复古连衣裙',
    desc: '春夏新款 · 显瘦版',
    price: 329,
    origin: 599,
    emoji: '👗',
    gradient: 'linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)',
    image: UNSPLASH('1572804013309-59a88b7e92f1'),
    tag: '上新',
    category: 'wear',
    sales: 1689,
    detail: [
      '修身 A 版型，遮肉显瘦',
      '高品质雪纺面料，垂坠飘逸',
      '复古泡泡袖，温柔法式风',
      '通勤、约会、出游都好穿',
    ],
  },
]

export const findProduct = (id: number) => products.find((p) => p.id === id)

/**
 * 配置统一出口。
 *
 * 模板化策略：每个商城分支在以下三个文件里改东西即可：
 *  - site.ts      品牌、主题色、虚拟用户、文案
 *  - banners.ts   首页轮播
 *  - products.ts  商品 + 分类
 */
export * from './site'
export * from './banners'
export * from './products'

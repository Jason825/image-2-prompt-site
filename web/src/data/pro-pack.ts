export const proPack = {
  name: "Image 2.0 商业提示词精选包",
  shortName: "商业提示词精选包",
  price: "¥29",
  originalPrice: "¥59",
  email: "763484227@qq.com",
  summary:
    "把可直接复用的高质量 Image 2.0 提示词整理成一个下载包，适合做电商图、海报、社媒封面、UI 截图和信息图。",
  includes: [
    "50 条精选商业提示词",
    "按电商、海报、社媒、UI、写实摄影、信息图分类",
    "每条包含中文说明、英文 prompt、适用场景和可替换变量",
    "提供可复制的 Markdown / 表格版本，方便二次整理",
  ],
  audiences: [
    "需要批量做图片素材的自媒体和运营",
    "想快速测试 Image 2.0 效果的独立开发者",
    "需要做海报、封面、电商图和内容图的设计师",
    "想节省提示词试错时间的 AI 工具使用者",
  ],
  sampleSlugs: [
    "ecommerce-app-homepage",
    "tea-launch-poster",
    "high-end-skincare-poster",
    "coffee-journey-infographic",
    "convenience-store-night-scene",
    "movie-collage-poster",
  ],
};

export function getPurchaseMailto() {
  const subject = encodeURIComponent("购买 Image 2.0 商业提示词精选包");
  const body = encodeURIComponent(
    [
      "你好，我想购买 Image 2.0 商业提示词精选包。",
      "",
      "我的需求：",
      "使用场景：",
      "希望收到的文件格式：",
    ].join("\n"),
  );

  return `mailto:${proPack.email}?subject=${subject}&body=${body}`;
}

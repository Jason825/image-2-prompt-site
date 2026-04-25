# ImagePromptive 前端页面生成文档 V1

将下面内容直接用于生成前端页面。  
风格统一为：`优雅、现代、简洁、图片驱动、留白充足`。

---

为 `ImagePromptive` 设计一套完整前端页面。

`ImagePromptive` 是一个只聚焦 `Image 2.0` 的 Prompt 网站，用户可以浏览高质量 Prompt、查看效果图、按标签筛选、进入详情页并一键复制 Prompt。

## 1. 总体风格

- 优雅
- 现代
- 简洁
- 高级
- 图片驱动
- 轻盈卡片
- 不复杂

不要做成：

- 后台界面
- 普通 SaaS 模板
- 紫色 AI 模板风
- 纯黑白到过于单调

## 2. 视觉方向

- 奶白色背景
- 青绿偏蓝作为主色
- 少量珊瑚色点缀
- 局部使用很轻的柔和渐变
- 卡片有细腻阴影和轻微半透明感
- 圆角偏大
- 整体有画廊感和编辑精选感

## 3. 全站统一元素

导航统一包含：

- Logo / 品牌名 `ImagePromptive`
- Explore
- Collections
- About
- 右侧主按钮 `Browse Prompts`

全站统一组件：

- 搜索框
- 标签按钮
- Prompt 卡片
- Collection 卡片
- Prompt 文本块
- Copy Prompt 按钮
- 轻量 CTA

交互统一要求：

- 卡片 Hover 轻微上浮
- 搜索框聚焦时柔和高亮
- 标签选中状态清晰
- 按钮点击感明确

## 4. 首页

首页只保留核心内容，风格简洁但优美。

模块：

- 顶部导航
- Hero
- 分类标签区
- Prompt 瀑布流
- 底部 CTA

Hero 内容：

- 标题：`Curated Image 2.0 Prompts`
- 副标题：`Browse refined, reusable prompts with visual examples and copy-ready structure.`
- 一个大搜索框

分类标签示例：

- Product
- Portrait
- Poster
- 3D
- E-commerce
- Social

首页主体使用瀑布流 / Masonry Grid。

每张 Prompt 卡片只包含：

- 效果图
- 标题
- 1 到 2 个标签
- `Copy Prompt`

底部 CTA：

- `Explore More Prompts`

## 5. Prompt 浏览页

页面目标：搜索、筛选、浏览、复制、进入详情。

模块：

- 顶部导航
- 页面标题
- 搜索框
- 标签筛选区
- Prompt 瀑布流 / 网格
- 底部轻 CTA

标题：

- `Explore Prompts`

副文案：

- `Search and browse clean, reusable Image 2.0 prompts.`

每张卡片包含：

- 效果图
- 标题
- 1 到 2 个标签
- `Copy Prompt`
- `View`

## 6. Prompt 详情页

页面目标：看图、读 Prompt、复制、继续浏览相似内容。

模块：

- 顶部导航
- 标题区
- 主内容区
- 简短说明区
- 相似 Prompt 区
- 底部轻 CTA

标题区包含：

- Prompt 标题
- 一句简短描述
- 少量标签

主内容区重点：

- 一张大效果图
- Prompt 文本块
- `Copy Prompt`

可少量保留：

- Negative Prompt
- 参数信息

简短说明区只说明：

- 适合什么场景
- 可替换什么内容

相似 Prompt 区展示 3 到 4 张小卡片。

底部 CTA：

- `Explore More Prompts`

## 7. Collections 专题页

页面目标：按专题发现 Prompt。

模块：

- 顶部导航
- 页面标题区
- 专题标签区
- 专题卡片主区域
- 精选专题横幅
- 底部轻 CTA

标题：

- `Collections`

副文案：

- `Curated prompt collections for styles, moods, and visual directions.`

专题标签示例：

- Cinematic
- Product
- Portrait
- 3D
- Editorial
- Social

每张专题卡片只包含：

- 封面图
- 标题
- 一句短说明
- `View Collection`

精选专题横幅只包含：

- 一张大封面图
- 专题标题
- 一句短说明
- `Browse Collection`

底部 CTA：

- `Explore More Prompts`

## 8. 输出要求

- 一次生成完整的 4 个页面
- 所有页面风格统一
- 页面简洁，不要信息过多
- 图片内容优先
- 桌面端优先，同时可适配移动端
- 看起来像真实产品，而不是概念稿

重点：  
`优雅、现代、简洁、图片驱动、瀑布流、可复制 Prompt。`

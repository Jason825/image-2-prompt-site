export type PromptItem = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  popularityScore?: number;
  description: string;
  prompt: string;
  negativePrompt?: string;
  notes: string;
  useCase: string;
  ratio: string;
  imageSrc: string;
  imageAlt: string;
  cardHeight: string;
  collectionSlug: string;
  sourceLabel: string;
};

export type CollectionItem = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  count: number;
  imageSrc: string;
  summary: string;
  promptSlugs: string[];
};

export type CategoryMeta = {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
};

export type TagMeta = {
  slug: string;
  title: string;
  count: number;
  sampleImage: string;
};

export type SourceMeta = {
  id: string;
  title: string;
  description: string;
  pathLabel: string;
  includedCount: number;
};

export const navItems = [
  { href: "/explore", label: "浏览" },
  { href: "/categories", label: "分类" },
  { href: "/collections", label: "专题" },
];

export const categoryTags = [
  "全部",
  "摄影",
  "界面",
  "海报",
  "图表",
  "角色",
];

export const prompts: PromptItem[] = [
  {
    slug: "convenience-store-night-scene",
    title: "深夜便利店街拍场景",
    category: "摄影",
    tags: ["写实", "夜景"],
    popularityScore: 96,
    description:
      "深夜便利店门口的真实群像，适合测试玻璃反射、城市灯光和普通人状态。",
    prompt:
      "Create an ultra-realistic urban street group photo at a convenience store entrance at 10 PM summer night. 3-4 young people briefly chatting at the entrance, someone holding drinks, someone sitting on plastic outdoor chairs, someone standing looking at their phone. Bright white light streaming through the glass doors and windows, warm yellow street lights and distant car headlights outside. Characters wearing everyday clothes: T-shirts, shirts, shorts, jeans, sneakers. No internet celebrity styling. Faces and postures must look like real pedestrians, not overly polished. Environment must include real convenience store elements: freezer stickers, promotional posters, trash cans, entrance mats, glass reflections, shared bikes on roadside, water droplets from drink bottles on ground.",
    negativePrompt:
      "overly polished faces, concept art look, stylized fashion poses",
    notes:
      "适合做首页主视觉和摄影类详情页，重点体现真实感、夜景灯光和多人自然互动。",
    useCase: "城市街拍、真实生活切片、夜景写实。",
    ratio: "4:5",
    imageSrc: "/generated-prompts/convenience-store-night-scene.png",
    imageAlt: "深夜便利店街拍场景",
    cardHeight: "h-96",
    collectionSlug: "photography-realism",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "handwritten-notebook-photo",
    title: "手写笔记本实拍",
    category: "摄影",
    tags: ["实拍", "文具"],
    popularityScore: 88,
    description:
      "iPhone 质感的随手拍，测试自然光、手写细节和真实桌面氛围。",
    prompt:
      "Amateur photo of an open notebook lying flat, filled with handwritten notes in black ballpoint pen. The handwriting is casual and slightly messy, like personnal notes, natural imperfections, crossed out words, underlined headings. Shot from slightly above, natural daylight from a window, no flash. Casual desk setting, shot on iPhone",
    negativePrompt: "perfect typography, studio setup, over-clean desk",
    notes:
      "很适合在网站里做“写实细节能力”案例，能直接让用户感受到模型对手写文本和真实桌面材质的处理能力。",
    useCase: "手写笔记、桌面随拍、教育和内容创作素材。",
    ratio: "4:5",
    imageSrc: "/generated-prompts/handwritten-notebook-photo.png",
    imageAlt: "手写笔记本实拍",
    cardHeight: "h-[28rem]",
    collectionSlug: "photography-realism",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "ecommerce-app-homepage",
    title: "电商 App 首页截图",
    category: "界面",
    tags: ["电商", "界面"],
    popularityScore: 98,
    description:
      "高密度中文和真实商业 UI 的代表案例，适合做站内重点展示。",
    prompt:
      'Generate a high-fidelity mobile e-commerce app homepage screenshot inspired by mainstream Chinese e-commerce apps in 2026. The interface should look fully realistic, with complete mobile-app UI logic and strong commercial design polish. Use these exact Chinese labels where appropriate: city: "杭州"; category tabs: "推荐、数码、家电、服饰、美妆、食品、运动、家居"; top banner: "618 预售开启" and "每满300减50"; recommendation section: "猜你喜欢". All Chinese text must be clear and readable with realistic fonts.',
    negativePrompt: "concept UI, fake icons, unreadable text, dribbble shot",
    notes:
      "这类案例非常适合做 Prompt 详情页，因为它能同时展示排版、中文小字和真实 App 逻辑。",
    useCase: "产品原型、中文 UI、商业截图生成。",
    ratio: "9:16",
    imageSrc: "/generated-prompts/ecommerce-app-homepage.png",
    imageAlt: "电商 App 首页截图",
    cardHeight: "h-[30rem]",
    collectionSlug: "ui-and-social",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "music-player-interface",
    title: "音乐播放器界面",
    category: "界面",
    tags: ["音乐", "中文排版"],
    popularityScore: 86,
    description:
      "移动端播放器界面案例，适合展示深色 UI、歌词区和细节控件表现。",
    prompt:
      'Create a high-fidelity Chinese music app player interface screenshot in mobile portrait orientation, with refined visuals similar to a modern streaming player. Use dark mode, with the background derived from a blurred and diffused version of the album cover colors. Use these exact Chinese labels and names: title: "正在播放"; song name: "海边的晚风"; artist: "林秋"; album: "夏夜实验室".',
    negativePrompt: "low fidelity, unreadable lyrics, fake player layout",
    notes:
      "适合作为 UI 分类中的第二个重点案例，和电商页形成深浅模式对照。",
    useCase: "音乐 App、播放器界面、深色 UI。",
    ratio: "9:16",
    imageSrc: "/generated-prompts/music-player-interface.png",
    imageAlt: "音乐播放器界面",
    cardHeight: "h-[26rem]",
    collectionSlug: "ui-and-social",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "tea-launch-poster",
    title: "中式茶饮新品发布海报",
    category: "海报",
    tags: ["海报", "品牌视觉"],
    popularityScore: 94,
    description:
      "高完成度商业海报案例，适合放在首页提升视觉质感。",
    prompt:
      'Design a 3:4 vertical poster for a new Chinese trendy tea launch. Use a New Chinese visual style that feels light-luxury and restrained. The palette should be dark green, off-white, and gold, with rice-paper texture, elegant negative space, landscape accents, and modern layout design. The poster must accurately display the following exact Chinese copy: "山川茶事" "山柚观音" "冷泡系列" "新品上市" and other promotional text with clear hierarchy.',
    negativePrompt: "cheap e-commerce look, garish colors, messy typography",
    notes:
      "这类图很适合专题页封面，也能直接拉高站点第一屏的视觉成熟度。",
    useCase: "品牌海报、餐饮上新、中文商业视觉。",
    ratio: "3:4",
    imageSrc: "/generated-prompts/tea-launch-poster.png",
    imageAlt: "中式茶饮新品发布海报",
    cardHeight: "h-[22rem]",
    collectionSlug: "poster-and-brand",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "coffee-journey-infographic",
    title: "一杯咖啡的旅程信息图",
    category: "图表",
    tags: ["信息图", "教育"],
    popularityScore: 91,
    description:
      "信息组织能力很强的一类案例，适合专题页和详情页承接。",
    prompt:
      'Create a Chinese infographic poster themed "一杯咖啡 如何来到你手里" ("How a Cup of Coffee Reaches You"). Use a premium information-design style with both educational clarity and commercial appeal. The layout should include directional flow, arrows, data boxes, icons, simple illustrations, and modular cards. Use coffee brown, milk white, ink black, and copper accents.',
    negativePrompt: "classroom slide, cheap infographic, poor hierarchy",
    notes:
      "特别适合网站里的专题页，因为它能把“知识卡片 / 信息图”单独拎成一类。",
    useCase: "知识卡片、门店展示、教育向视觉内容。",
    ratio: "3:4",
    imageSrc: "/generated-prompts/coffee-journey-infographic.png",
    imageAlt: "一杯咖啡的旅程信息图",
    cardHeight: "h-[25rem]",
    collectionSlug: "infographic-and-education",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "character-reference-sheet",
    title: "官方角色设定参考页",
    category: "角色",
    tags: ["角色设定", "参考页"],
    popularityScore: 84,
    description:
      "角色一致性与设定页布局的代表案例，适合补齐风格维度。",
    prompt:
      "Based on this character and background, please create a character reference sheet similar to official setting materials. Includes three-view drawings: front view, side view, and back view. Add variations of the character's facial expressions, break down and display detailed parts of the clothing and equipment, add a color palette, and include a brief explanation of the worldview setting.",
    negativePrompt: "messy layout, missing turnarounds, inconsistent face",
    notes:
      "可作为详情页里的“结构化输出能力”案例，也适合做专题页的角色类封面。",
    useCase: "角色设定、IP 方案、游戏和动画前期资料。",
    ratio: "4:5",
    imageSrc: "/generated-prompts/official-character-reference-sheet.png",
    imageAlt: "官方角色设定参考页",
    cardHeight: "h-[27rem]",
    collectionSlug: "character-consistency",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "high-end-skincare-poster",
    title: "高端护肤品海报",
    category: "海报",
    tags: ["护肤", "商业海报"],
    popularityScore: 90,
    description:
      "高客单价护肤品牌视觉案例，适合展示卖点层级、赠品信息和价格排布。",
    prompt:
      'Design a premium Chinese skincare launch poster with elegant commercial hierarchy. Keep the overall feeling premium, not tacky, and include key product selling points, pricing, gift-list modules, and concise functional phrases. Fine print: "实际效果因人而异，请坚持使用".',
    negativePrompt: "cheap livestream style, noisy layout, excessive promotion effects",
    notes:
      "适合扩展为美妆、保健品、消费品海报模板，也很适合作为首页海报类案例补充。",
    useCase: "护肤品海报、品牌卖点图、商业宣传物料。",
    ratio: "3:4",
    imageSrc: "/generated-prompts/high-end-skincare-poster.png",
    imageAlt: "高端护肤品海报",
    cardHeight: "h-[26rem]",
    collectionSlug: "poster-and-brand",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "character-relationship-map",
    title: "核心人物关系图",
    category: "图表",
    tags: ["关系图", "信息设计"],
    popularityScore: 79,
    description:
      "把叙事关系可视化成海报式信息图，适合世界观和角色关系整理。",
    prompt:
      'Please generate a key character relationship diagram for "XXX". It should combine poster-level design, information visualization, and clear hierarchy instead of looking like a cheap flowchart.',
    negativePrompt: "crowded flowchart, weak hierarchy, plain office diagram",
    notes:
      "适合剧情梳理、IP 关系图和内容账号做作品解读，也能扩展成专题类内容。",
    useCase: "角色关系图、剧情梳理、IP 世界观展示。",
    ratio: "3:4",
    imageSrc: "/generated-prompts/character-relationship-map.png",
    imageAlt: "核心人物关系图",
    cardHeight: "h-[24rem]",
    collectionSlug: "infographic-and-education",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "museum-catalog-infographic",
    title: "博物馆图录风拆解信息图",
    category: "图表",
    tags: ["博物馆", "拆解图"],
    popularityScore: 82,
    description:
      "图录式长信息版面，兼顾主视觉、结构拆解、材质说明和文化解释。",
    prompt:
      'Please automatically generate a museum catalog-style Chinese disassembly infographic based on the subject. The result should feel like a national museum exhibition board with structural callouts, materials, color meanings, and collectible visual polish.',
    negativePrompt: "ordinary poster, anime illustration, e-commerce detail page",
    notes:
      "这类内容非常适合做专题沉淀，能把信息图能力和文化内容能力拉开差异。",
    useCase: "博物馆图录、文化类知识卡片、拆解型信息图。",
    ratio: "3:4",
    imageSrc: "/generated-prompts/jingdezhen-porcelain-infographic.png",
    imageAlt: "博物馆图录风拆解信息图",
    cardHeight: "h-[27rem]",
    collectionSlug: "infographic-and-education",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "movie-collage-poster",
    title: "电影拼贴海报",
    category: "海报",
    tags: ["拼贴", "电影感"],
    popularityScore: 80,
    description:
      "适合做作品宇宙、IP 内容聚合和多画面叙事型的海报输出。",
    prompt:
      "entire superman movie image collage one shot in one output",
    negativePrompt: "single scene only, weak collage composition, missing variety",
    notes:
      "适合影视内容账号、专题封面和世界观集合图，也能做系列化拼贴展示。",
    useCase: "电影拼贴、IP 内容聚合、系列海报。",
    ratio: "3:4",
    imageSrc: "/generated-prompts/movie-collage-poster.png",
    imageAlt: "电影拼贴海报",
    cardHeight: "h-[25rem]",
    collectionSlug: "video-collage-comics",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "iphone-subway-station-candid",
    title: "iPhone 原生质感地铁站抓拍",
    category: "摄影",
    tags: ["抓拍", "通勤"],
    popularityScore: 76,
    description:
      "手机直出的地铁站抓拍，适合测试运动模糊、通勤氛围和真实手机成像。",
    prompt:
      "Create a completely RAW quality, unprocessed, unedited image with full iPhone camera quality. A subway station in the United States, a momentary candid blur. The subway is in motion. In front of the subway, there is an elderly woman and an elderly man.",
    negativePrompt: "cinematic grading, polished lighting, staged pose",
    notes:
      "这一版重点保留了原生手机抓拍感，强调运动模糊和生活化人物状态，没有去复刻原示例图。",
    useCase: "手机街拍、地铁抓拍、真实生活场景。",
    ratio: "4:5",
    imageSrc: "/generated-prompts/iphone-subway-station-candid.png",
    imageAlt: "iPhone 原生质感地铁站抓拍",
    cardHeight: "h-[27rem]",
    collectionSlug: "photography-realism",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "rice-micro-text",
    title: "米粒微缩文字",
    category: "摄影",
    tags: ["微距", "创意"],
    popularityScore: 72,
    description:
      "极致微距创意图，适合测试模型在极小文字和材质细节上的表现。",
    prompt:
      "A massive pile of rice, and on one single grain of rice there is tiny text that reads 'wOw'.",
    negativePrompt: "illustration, fake plastic texture, blurry macro",
    notes:
      "我把它做成了更像摄影棚微距拍摄的效果，重点看米粒纹理、景深和小字控制。",
    useCase: "微距创意、细节表现、社媒传播图。",
    ratio: "1:1",
    imageSrc: "/generated-prompts/rice-micro-text.png",
    imageAlt: "米粒微缩文字",
    cardHeight: "h-[22rem]",
    collectionSlug: "photography-realism",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "pixel-art-items-grid",
    title: "100 个像素风物品网格",
    category: "图表",
    tags: ["像素风", "网格"],
    popularityScore: 78,
    description:
      "100 格像素物件总览图，适合测试批量元素生成、一致风格与标签清晰度。",
    prompt:
      "Create a single image containing a grid of 100 completely unique pixel art items, each with a meaningful label.",
    negativePrompt: "repeated items, inconsistent style, unreadable labels",
    notes:
      "这类内容很适合站内当成合集型案例，图片本身信息量很大，也有很强传播属性。",
    useCase: "像素风素材板、游戏道具合集、清单视觉。",
    ratio: "1:1",
    imageSrc: "/generated-prompts/pixel-art-items-grid.png",
    imageAlt: "100 个像素风物品网格",
    cardHeight: "h-[24rem]",
    collectionSlug: "infographic-and-education",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "youtube-time-travel-video",
    title: "YouTube 时空穿越视频截图",
    category: "界面",
    tags: ["YouTube", "视频截图"],
    popularityScore: 74,
    description:
      "带有内容感的视频页面截图，适合展示平台界面和画中画叙事能力。",
    prompt:
      "Screenshot of a YouTube video showing someone who time-traveled to the Middle Ages.",
    negativePrompt: "fake interface, unreadable UI, concept shot",
    notes:
      "我把它做成了更像真实视频页面的样子，同时把视频内容换成原创中世纪广场题材，避免贴近原示例图。",
    useCase: "视频截图、平台界面、内容封面图。",
    ratio: "16:9",
    imageSrc: "/generated-prompts/youtube-time-travel-video.png",
    imageAlt: "YouTube 时空穿越视频截图",
    cardHeight: "h-[20rem]",
    collectionSlug: "ui-and-social",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "song-dynasty-social-feed",
    title: "宋代社交媒体信息流",
    category: "界面",
    tags: ["古今融合", "社媒"],
    popularityScore: 87,
    description:
      "把宋代人物内容放进现代社交媒体界面，兼具趣味性和高信息密度。",
    prompt:
      "\"Song Dynasty People's Moments\" mobile social feed with a Song Dynasty literati avatar, username 'Su Dongpo SuShi_Official', Dongpo pork post, Song Dynasty dark-mode interface, and readable Chinese UI text.",
    negativePrompt: "generic fantasy UI, unreadable Chinese, cluttered layout",
    notes:
      "这张图重点保留了古今融合的笑点，但界面和内容都是重新组织过的原创版本。",
    useCase: "内容创意、社媒截图、历史趣味图文。",
    ratio: "9:16",
    imageSrc: "/generated-prompts/song-dynasty-social-feed.png",
    imageAlt: "宋代社交媒体信息流",
    cardHeight: "h-[29rem]",
    collectionSlug: "ui-and-social",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "custom-ui-design-system",
    title: "自定义风格 UI 设计系统",
    category: "界面",
    tags: ["设计系统", "组件"],
    popularityScore: 83,
    description:
      "一张图展示桌面端、移动端和组件库，适合做界面类能力的总览案例。",
    prompt:
      "Generate a UI design system in a modern elegant style, including web pages, mobile, cards, controls, buttons, and charts in one polished design board.",
    negativePrompt: "messy board, inconsistent components, template feel",
    notes:
      "我把它做成了偏产品官网风格的设计板，而不是常见的 Dribbble 拼贴图。",
    useCase: "设计系统、UI 总览、产品视觉展示。",
    ratio: "4:5",
    imageSrc: "/generated-prompts/custom-ui-design-system.png",
    imageAlt: "自定义风格 UI 设计系统",
    cardHeight: "h-[28rem]",
    collectionSlug: "ui-and-social",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "encyclopedia-snow-leopard",
    title: "百科风雪豹知识卡片",
    category: "图表",
    tags: ["百科", "知识卡片"],
    popularityScore: 77,
    description:
      "更适合社媒传播的百科风长卡，兼顾主视觉、模块化信息和可读性。",
    prompt:
      "Generate a high-quality vertical encyclopedia-style infographic for snow leopard with modular educational sections, callouts, scorecard, and clean Chinese layout.",
    negativePrompt: "ad poster, childish illustration, weak structure",
    notes:
      "这张图的重点是把知识卡片做成更适合社媒收藏和转发的格式，而不是普通科普海报。",
    useCase: "百科卡片、知识图文、教育向内容。",
    ratio: "3:4",
    imageSrc: "/generated-prompts/encyclopedia-snow-leopard.png",
    imageAlt: "百科风雪豹知识卡片",
    cardHeight: "h-[26rem]",
    collectionSlug: "infographic-and-education",
    sourceLabel: "Image 2.0 提示词整理版",
  },
  {
    slug: "fitness-chest-infographic",
    title: "新手胸部训练信息图",
    category: "图表",
    tags: ["健身", "训练计划"],
    popularityScore: 73,
    description:
      "实用型训练长图，适合测试信息结构、动作模块和中文卡片化表达。",
    prompt:
      "Generate a Chinese fitness infographic for beginner chest training with title, goal, warm-up, 4 to 6 exercises, progression logic, reminders, and recovery suggestions.",
    negativePrompt: "crowded text wall, bland slide, no visual hierarchy",
    notes:
      "这张图比较偏“能直接用”的实用型内容，很适合拿来验证用户会不会收藏或转发。",
    useCase: "健身计划、训练卡片、实用信息图。",
    ratio: "3:4",
    imageSrc: "/generated-prompts/fitness-chest-infographic.png",
    imageAlt: "新手胸部训练信息图",
    cardHeight: "h-[26rem]",
    collectionSlug: "infographic-and-education",
    sourceLabel: "Image 2.0 提示词整理版",
  },
];

export const collections: CollectionItem[] = [
  {
    slug: "photography-realism",
    title: "摄影与写实",
    description: "真实感、光线、随手拍质感与生活场景重建。",
    tags: ["摄影", "写实"],
    count: 4,
    imageSrc: "/examples/convenience-store-night-scene-01-4b322ed4.jpg",
    summary:
      "适合想测试真实生活切片、夜景氛围、拍摄设备质感和自然人物状态的场景。",
    promptSlugs: [
      "convenience-store-night-scene",
      "handwritten-notebook-photo",
      "iphone-subway-station-candid",
      "rice-micro-text",
    ],
  },
  {
    slug: "ui-and-social",
    title: "UI / 社媒 / 界面",
    description: "中文排版、真实 App 逻辑和界面细节表现。",
    tags: ["UI", "中文"],
    count: 5,
    imageSrc: "/examples/e-commerce-app-homepage-01-cfebfd01.jpg",
    summary:
      "重点看高密度中文、小字可读性、真实交互层级和商业化界面完成度。",
    promptSlugs: [
      "ecommerce-app-homepage",
      "music-player-interface",
      "youtube-time-travel-video",
      "song-dynasty-social-feed",
      "custom-ui-design-system",
    ],
  },
  {
    slug: "poster-and-brand",
    title: "排版 / 海报 / 视觉设计",
    description: "商业海报、品牌视觉和高完成度中文排版案例。",
    tags: ["海报", "品牌"],
    count: 2,
    imageSrc: "/examples/chinese-tea-drink-product-launch-poster-01-e1d6bb34.jpg",
    summary:
      "适合沉淀品牌海报、视觉 KV、中文文案层级和商业物料风格模板。",
    promptSlugs: ["tea-launch-poster", "high-end-skincare-poster"],
  },
  {
    slug: "infographic-and-education",
    title: "信息图 / 教育 / 文档",
    description: "模块化信息设计、知识卡片和长信息表达。",
    tags: ["信息图", "知识"],
    count: 6,
    imageSrc: "/examples/coffee-journey-infographic-01-c4960399.jpg",
    summary:
      "重点测试信息组织、模块结构、长图设计和知识型视觉内容表达。",
    promptSlugs: [
      "coffee-journey-infographic",
      "character-relationship-map",
      "museum-catalog-infographic",
      "pixel-art-items-grid",
      "encyclopedia-snow-leopard",
      "fitness-chest-infographic",
    ],
  },
  {
    slug: "character-consistency",
    title: "角色设定与一致性",
    description: "角色三视图、设定页和一致性控制案例。",
    tags: ["角色", "设定"],
    count: 1,
    imageSrc: "/examples/official-character-reference-sheet-01-3d8d4ffb.jpeg",
    summary:
      "适合做 IP 设定、动画游戏前期资料，以及多角度一致性展示。",
    promptSlugs: ["character-reference-sheet"],
  },
  {
    slug: "video-collage-comics",
    title: "视频感 / 拼贴 / 漫画",
    description: "多画面叙事、拼贴式海报和内容聚合视觉表达。",
    tags: ["拼贴", "电影"],
    count: 1,
    imageSrc: "/examples/movie-collage-01-6bf33a10.jpg",
    summary:
      "适合做 IP 宇宙展示、剧情回顾、系列内容整合和更具传播感的封面视觉。",
    promptSlugs: ["movie-collage-poster"],
  },
];

export const featuredCollection = collections[1];

export const sources: SourceMeta[] = [
  {
    id: "image-2-prompt-compendium",
    title: "Image 2.0 提示词整理版",
    description:
      "当前站内主要案例来源，包含摄影写实、UI 界面、海报、信息图、角色设定等方向的可复用提示词与示例图。",
    pathLabel:
      "E:\\AI\\AI知识库-obsidian\\AI知识库\\image 2.0\\Image 2.0 提示词整理版.md",
    includedCount: prompts.length,
  },
];

export const categoryMeta: Record<string, CategoryMeta> = {
  摄影: {
    slug: "photography-realism",
    title: "摄影",
    description: "真实感、街拍和生活类图片。",
    imageSrc: "/examples/convenience-store-night-scene-01-4b322ed4.jpg",
  },
  界面: {
    slug: "ui-social-interface",
    title: "界面",
    description: "App、播放器和中文界面截图。",
    imageSrc: "/examples/e-commerce-app-homepage-01-cfebfd01.jpg",
  },
  海报: {
    slug: "poster-visual-design",
    title: "海报",
    description: "品牌海报、商业视觉和拼贴类封面。",
    imageSrc: "/examples/chinese-tea-drink-product-launch-poster-01-e1d6bb34.jpg",
  },
  图表: {
    slug: "infographic-education-docs",
    title: "图表",
    description: "信息图、关系图和拆解长图。",
    imageSrc: "/examples/coffee-journey-infographic-01-c4960399.jpg",
  },
  角色: {
    slug: "character-consistency",
    title: "角色",
    description: "角色设定、三视图和参考页。",
    imageSrc: "/examples/official-character-reference-sheet-01-3d8d4ffb.jpeg",
  },
};

export function getPromptsByCollection(slug: string) {
  return prompts.filter((item) => item.collectionSlug === slug);
}

export function getCollectionBySlug(slug: string) {
  return collections.find((item) => item.slug === slug);
}

export function getPromptsByCategory(category: string) {
  return prompts.filter((item) => item.category === category);
}

export function getCategoryBySlug(slug: string) {
  return Object.values(categoryMeta).find((item) => item.slug === slug);
}

export function getCategoryTitleFromSlug(slug: string) {
  return Object.entries(categoryMeta).find(([, value]) => value.slug === slug)?.[0];
}

export function getCategories() {
  return Object.entries(categoryMeta).map(([title, meta]) => ({
    ...meta,
    count: getPromptsByCategory(title).length,
  }));
}

export function slugifyTag(tag: string) {
  return tag
    .toLowerCase()
    .replace(/\s*\/\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getTags(): TagMeta[] {
  const map = new Map<string, TagMeta>();

  prompts.forEach((prompt) => {
    prompt.tags.forEach((tag) => {
      const existing = map.get(tag);

      if (existing) {
        existing.count += 1;
        return;
      }

      map.set(tag, {
        slug: slugifyTag(tag),
        title: tag,
        count: 1,
        sampleImage: prompt.imageSrc,
      });
    });
  });

  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getTagBySlug(slug: string) {
  return getTags().find((tag) => tag.slug === slug);
}

export function getPromptsByTag(tag: string) {
  return prompts.filter((item) => item.tags.includes(tag));
}

export function getRelatedPrompts(slug: string) {
  const current = prompts.find((item) => item.slug === slug);
  if (!current) return [];

  return prompts
    .filter((item) => item.slug !== slug)
    .map((item) => {
      let score = 0;
      if (item.category === current.category) score += 3;
      if (item.collectionSlug === current.collectionSlug) score += 2;
      const commonTags = item.tags.filter((tag) => current.tags.includes(tag)).length;
      score += commonTags;
      return { item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.item);
}




# ImagePromptive

`ImagePromptive` 是一个围绕 `Image 2.0` 提示词整理、浏览、搜索与案例展示的轻量内容站。

当前项目重点不是做复杂平台，而是先把这几件事做好：

- 让用户快速找到可复用的高质量提示词
- 提供真实案例图、说明和一键复制体验
- 基于真实数据做热门排序
- 用尽量低成本、可维护的方式持续上线更新

## 当前功能

- 首页精选内容展示
- 浏览与搜索提示词
- 分类浏览
- 专题浏览
- 提示词详情页
- 复制提示词
- 下载示例图
- 浏览 / 复制 / 下载统计
- 热门排序

## 技术栈

- `Next.js`
- `Postgres`
- `Nginx`
- `Docker Compose`
- `GitHub Actions`

## 项目结构

```text
image-2-prompt-site/
├─ README.md
├─ AGENTS.md
├─ PRD_V1.md
├─ deploy/
└─ web/
   ├─ src/
   ├─ docker-compose.yml
   ├─ Dockerfile
   └─ README.md
```

说明：

- 根目录放项目文档和部署脚本
- `web` 目录是真正运行的网站项目

## 本地开发

进入 `web` 目录后执行：

```bash
cd web
npm install
npm run dev
```

默认访问：

```bash
http://localhost:3000
```

## 部署方式

当前采用：

- 腾讯云轻量应用服务器
- Docker Compose
- GitHub Actions 自动部署

发布流程已经打通，日常发布方式就是：

```bash
git add .
git commit -m "中文提交信息"
git push origin main
```

推送到 `main` 后，GitHub Actions 会自动连接服务器并执行部署脚本。

## 说明文档

- 项目规则：[AGENTS.md](E:/AI/MyProducts/image-2-prompt-site/AGENTS.md)
- 产品文档：[PRD_V1.md](E:/AI/MyProducts/image-2-prompt-site/PRD_V1.md)
- 网站项目说明：[web/README.md](E:/AI/MyProducts/image-2-prompt-site/web/README.md)

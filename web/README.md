# ImagePromptive Web

这是 `ImagePromptive` 的前端与接口项目，适合部署到腾讯云轻量应用服务器。

## 本地开发

进入项目目录后运行：

```bash
npm install
npm run dev
```

默认访问：

```bash
http://localhost:3000
```

## 必要环境变量

本项目当前最关键的环境变量是：

```bash
DATABASE_URL=postgresql://postgres:your_password@127.0.0.1:5432/imagepromptive
```

样例文件见：

```bash
.env.example
```

## Docker 部署

当前仓库已经内置：

- `Dockerfile`
- `docker-compose.yml`
- `nginx/default.conf`
- `db/prompt_stats.sql`

在服务器上进入 `web` 目录后，可直接启动：

```bash
docker compose up -d --build
```

启动后默认结构是：

- `Next.js` 应用容器
- `Postgres` 数据库容器
- `Nginx` 反向代理容器

默认对外端口：

```bash
80
```

## 腾讯云服务器建议

推荐环境：

- Ubuntu 22.04
- 已安装 Docker / Docker Compose
- 开放 80 端口

如果后续要绑定域名和 HTTPS，可以继续在 Nginx 层接入证书。

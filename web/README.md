# ImagePromptive Web

这是 `ImagePromptive` 的前端与接口项目，当前已经按腾讯云轻量应用服务器部署方式准备好。

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

## 本地环境变量

本地开发当前最关键的环境变量是：

```bash
DATABASE_URL=postgresql://postgres:your_password@127.0.0.1:5432/imagepromptive
```

样例文件见：

```bash
.env.example
```

## 服务器部署文件

当前仓库已经内置：

- `Dockerfile`
- `docker-compose.yml`
- `nginx/default.conf`
- `db/prompt_stats.sql`
- `.env.server.example`

部署结构是：

- `Next.js` 应用容器
- `Postgres` 数据库容器
- `Nginx` 反向代理容器

默认对外端口：

```bash
80
```

## 腾讯云轻量服务器部署步骤

假设你已经把仓库拉到了服务器，并进入：

```bash
cd /www/image-2-prompt-site/web
```

### 1. 准备服务器环境变量

先复制服务器环境变量样板：

```bash
cp .env.server.example .env
```

然后编辑：

```bash
nano .env
```

至少把这一项改成你自己的强密码：

```bash
POSTGRES_PASSWORD=你自己的数据库密码
```

### 2. 启动服务

```bash
docker compose up -d --build
```

### 3. 检查运行状态

```bash
docker compose ps
docker compose logs --tail=100
```

### 4. 访问站点

如果服务器 `80` 端口已放行，可以直接访问：

```bash
http://你的服务器公网IP
```

## 常用命令

启动或重建：

```bash
docker compose up -d --build
```

查看状态：

```bash
docker compose ps
```

查看日志：

```bash
docker compose logs --tail=100
```

停止服务：

```bash
docker compose down
```

## 腾讯云服务器建议

推荐环境：

- Ubuntu 22.04
- 已安装 Docker / Docker Compose
- 放行 `22` 和 `80` 端口

如果后续要绑定域名和 HTTPS，可以继续在 Nginx 层接入证书。

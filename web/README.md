# ImagePromptive Web

这是 `ImagePromptive` 的前端与接口项目，当前部署目标是腾讯云轻量应用服务器。

## 本地开发

进入 `web` 目录后执行：

```bash
npm install
npm run dev
```

默认访问：

```bash
http://localhost:3000
```

## 本地环境变量

本地开发最关键的环境变量是：

```bash
DATABASE_URL=postgresql://postgres:your_password@127.0.0.1:5432/imagepromptive
```

样例文件见：

```bash
.env.example
```

## 服务器部署结构

当前仓库已经内置：

- `Dockerfile`
- `docker-compose.yml`
- `nginx/default.conf`
- `db/prompt_stats.sql`
- `.env.server.example`

运行结构是：

- `Next.js` 应用容器
- `Postgres` 数据库容器
- `Nginx` 反向代理容器

## 腾讯云服务器首次准备

假设你已经把仓库拉到服务器，并进入：

```bash
cd /www/image-2-prompt-site/web
```

### 1. 准备环境变量

```bash
cp .env.server.example .env
```

然后只在服务器本地修改 `.env`，至少设置：

```bash
POSTGRES_PASSWORD=your_own_database_password
```

### 2. 启动网站

```bash
sudo docker compose up -d --build
```

### 3. 检查状态

```bash
sudo docker compose ps
sudo docker compose logs --tail=100
```

## 自动部署最终方案

当前最终采用：

- `Gitee WebHook`
- 服务器本机监听服务 `deploy/hook_server.py`
- 执行根目录下的 `deploy/deploy.sh`

### 仓库中的自动部署文件

- `deploy/deploy.sh`
- `deploy/hook_server.py`
- `deploy/hook.env.example`
- `deploy/imagepromptive-deploy-hook.service`
- `deploy/push-all.ps1`

### 服务器准备步骤

```bash
cd /www/image-2-prompt-site
chmod +x deploy/deploy.sh
cp deploy/hook.env.example deploy/hook.env
```

然后只在服务器本地修改：

- `deploy/hook.env`

至少设置：

```bash
HOOK_HOST=0.0.0.0
HOOK_SECRET=你自己的Webhook密钥
```

安装并启动 systemd 服务：

```bash
sudo cp deploy/imagepromptive-deploy-hook.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now imagepromptive-deploy-hook
```

### Gitee WebHook 设置

在 Gitee 仓库中配置：

- WebHook 地址：`https://imagepromptive.top/deploy-hook`
- 事件类型：`Push`
- 密钥：与 `deploy/hook.env` 中的 `HOOK_SECRET` 一致

### Nginx 转发

当前 `nginx/default.conf` 已经预留：

- `https://imagepromptive.top/deploy-hook`

它会转发到服务器本机的部署监听服务。

### 当前标准发布流程

```bash
git add .
git commit -m "中文提交信息"
powershell -ExecutionPolicy Bypass -File .\deploy\push-all.ps1
```

说明：

- `origin` 建议设置为 Gitee
- `github` 建议设置为 GitHub
- `push-all.ps1` 会先推 Gitee，再推 GitHub

## 常用命令

启动或重建：

```bash
sudo docker compose up -d --build
```

查看状态：

```bash
sudo docker compose ps
```

查看日志：

```bash
sudo docker compose logs --tail=100
```

查看部署日志：

```bash
cd /www/image-2-prompt-site
tail -f deploy/logs/deploy.log
```

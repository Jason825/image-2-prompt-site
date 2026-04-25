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

默认对外端口：

```bash
80
```

## 腾讯云服务器手动部署

假设你已经把仓库拉到服务器，并进入：

```bash
cd /www/image-2-prompt-site/web
```

### 1. 准备服务器环境变量

```bash
cp .env.server.example .env
nano .env
```

至少把这项改成你自己的数据库密码：

```bash
POSTGRES_PASSWORD=your_own_database_password
```

### 2. 启动服务

```bash
docker compose up -d --build
```

### 3. 检查状态

```bash
docker compose ps
docker compose logs --tail=100
```

## 自动部署

当前最终采用的自动部署方案是：

- `GitHub Actions`
- `SSH` 登录腾讯云服务器
- 执行仓库根目录下的 `deploy/deploy.sh`

也就是说，后续不再使用：

- Gitee WebHook
- 本机部署监听服务
- Nginx 部署回调接口

### 仓库中的自动部署文件

- `.github/workflows/deploy.yml`
- `deploy/deploy.sh`

### GitHub Secrets

你需要在 GitHub 仓库的 `Settings -> Secrets and variables -> Actions` 中配置：

- `DEPLOY_HOST`
- `DEPLOY_PORT`
- `DEPLOY_USER`
- `DEPLOY_PATH`
- `DEPLOY_SSH_KEY`

### deploy.sh 的作用

`deploy/deploy.sh` 会自动执行：

1. 进入项目目录
2. 拉取最新代码
3. 重建并启动 Docker Compose
4. 输出容器状态

### 服务器准备

在服务器上需要保证：

```bash
cd /www/image-2-prompt-site
chmod +x deploy/deploy.sh
```

另外，当前 `deploy.sh` 会执行 `sudo docker compose ...`，因此用于部署的服务器用户需要具备无密码执行这条命令的能力。

如果仓库远端已经切到 Gitee，那么脚本会按当前 `origin` 拉取；如果保留 GitHub，也会按当前 `origin` 拉取。

### 当前标准发布流程

现在自动部署已经打通，后续发布统一按下面这套流程执行：

1. 在本地完成修改
2. 本地执行必要验证
3. 提交代码
4. 推送到 `main`
5. GitHub Actions 自动连接服务器并完成部署

常用命令：

```bash
git add .
git commit -m "中文提交信息"
git push origin main
```

### 如何确认部署成功

#### 方法一：看 GitHub Actions

进入仓库：

- `Actions`
- 选择工作流 `自动部署到腾讯云服务器`

如果整条工作流都是绿色，说明自动部署已成功执行。

#### 方法二：看服务器日志

在服务器执行：

```bash
cd /www/image-2-prompt-site
tail -f deploy/logs/deploy.log
```

如果需要看最近一次部署结果，也可以执行：

```bash
cd /www/image-2-prompt-site
tail -n 50 deploy/logs/deploy.log
```

### 如何手动重新部署

如果没有新提交，但你想手动重跑一次部署：

- 打开 GitHub 仓库 `Actions`
- 进入 `自动部署到腾讯云服务器`
- 点击 `Run workflow`

### 常见问题

#### 1. GitHub Actions 成功，但网站没更新

先看服务器上的部署日志，确认：

- `git pull` 是否拉到了最新代码
- `docker compose up -d --build` 是否成功执行

#### 2. Actions 无法连接服务器

优先检查 GitHub Secrets：

- `DEPLOY_HOST`
- `DEPLOY_PORT`
- `DEPLOY_USER`
- `DEPLOY_PATH`
- `DEPLOY_SSH_KEY`

#### 3. 部署脚本执行失败

优先检查：

- `/www/image-2-prompt-site/deploy/deploy.sh` 是否有执行权限
- 服务器当前仓库工作区是否干净
- `sudo docker compose` 是否可无密码执行

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

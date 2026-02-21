# 🚀 星际计划舱 | Interstellar Plan Pod

> 你的星际学习计划中心 — 向着硕博连读的目标，每天前进一小步。peace ✨

## 技术栈

- **框架**: Next.js 15 (App Router) + TypeScript
- **样式**: Tailwind CSS + 自定义星际主题
- **UI组件**: Shadcn/ui + Lucide Icons
- **状态管理**: Zustand (localStorage 持久化)
- **图表**: Recharts
- **拖拽**: @hello-pangea/dnd
- **PWA**: 自定义 Service Worker + Web App Manifest

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 访问
open http://localhost:3000
```

## 部署到 Vercel

### 方式1：Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署（首次会自动配置）
vercel

# 部署到生产环境
vercel --prod
```

### 方式2：GitHub 集成（推荐）

1. 将代码推送到 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com)，用 GitHub 登录
3. 点击 "New Project" → 选择你的仓库
4. Framework Preset 选 **Next.js**
5. 点击 "Deploy"
6. 完成！每次 push 代码会自动部署

## 📱 在手机上安装成 App

### iOS (Safari)

1. 用 Safari 打开部署后的网址
2. 点击底部 **分享按钮** (方框+箭头图标)
3. 滚动找到 **"添加到主屏幕"**
4. 点击 **"添加"**
5. 主屏幕上就会出现星际飞船图标 🚀

### Android (Chrome)

1. 用 Chrome 打开部署后的网址
2. 点击右上角 **三个点菜单**
3. 选择 **"安装应用"** 或 **"添加到主屏幕"**
4. 确认安装
5. 会出现安装横幅或直接安装到桌面

### 桌面 (Chrome / Edge)

1. 打开网址
2. 地址栏右侧会出现 **安装图标**（或点击菜单 → 安装）
3. 点击安装即可像桌面应用一样使用

## 项目结构

```
src/
├── app/          # 页面路由
├── components/   # 组件
│   ├── ui/       # shadcn/ui 基础组件
│   ├── layout/   # 布局组件
│   ├── dashboard/# 首页组件
│   ├── week/     # 周视图组件
│   ├── progress/ # 进度组件
│   └── habits/   # 习惯组件
├── stores/       # Zustand 状态管理
├── lib/          # 工具函数
└── hooks/        # 自定义 Hooks
```

## 功能列表

- ✅ Dashboard（星际问候 + 周主题 + 完成率圆环）
- ✅ 每日打卡（8项任务 + streak计数 + 星光动画）
- ✅ Peace浮动按钮（15条星际社会学金句）
- ✅ 周视图 + 可拖拽课程表
- ✅ 周末笔记（进城日 + 稀奇古怪日）
- ✅ 硕博倒计时 + 里程碑管理
- ✅ 学习统计图表（周/月）
- ✅ 睡眠打卡 + 卫生提醒 + 健身计时器
- ✅ 自定义设置
- ✅ 数据导入/导出（JSON）
- ✅ PWA（离线可用，可安装到桌面）
- ✅ 移动端优先 + 暗黑模式

## 后期升级方向

- [ ] 接入 Supabase（云端同步）
- [ ] 添加番茄钟
- [ ] 周/月报告生成
- [ ] 社交功能（学习伙伴）

---

Made with ☮️ & ✨ by 星际旅人
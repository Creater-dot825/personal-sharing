# 网络知识库

一个专注于网络技术学习和软件操作指南的在线学习平台。

## 功能特性

- 📚 **结构化分类** - 清晰地分为软件学习和相关知识两大分类
- 🌙 **深色/浅色主题** - 支持主题切换
- 📱 **响应式设计** - 完美适配各种设备
- 🎓 **学习路径** - 提供从入门到进阶的学习路线图
- 💬 **交流互动** - 支持内容建议和问题反馈
- 🚀 **简约现代** - 干净整洁的用户界面

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和布局
- **JavaScript** - 交互功能
- **Font Awesome** - 图标库
- **Google Fonts** - 字体（Inter）

## 项目结构

```
网络知识库/
├── index.html          # 首页（包含两大分类）
├── about.html          # 关于页面
├── contact.html        # 联系页面
├── post1.html          # 文章页面示例（Wireshark）
├── post2.html          # 文章页面示例（PuTTY）
├── styles.css          # 样式文件
├── script.js           # JavaScript 功能
└── README.md           # 项目说明
```

## 快速开始

### 1. 直接打开

双击 `index.html` 文件即可在浏览器中查看网站。

### 2. 使用本地服务器

**方法 1：使用 Python**

```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

**方法 2：使用 Node.js (http-server)**

```bash
# 安装 http-server
npm install -g http-server

# 启动服务器
http-server -p 8080
```

然后在浏览器中访问：`http://localhost:8080`

## 主要内容分类

### 软件学习
- **网络分析工具** - Wireshark、tcpdump 等抓包工具
- **远程管理软件** - PuTTY、SecureCRT 等远程连接工具
- **服务器软件** - Windows Server、Linux 服务器配置
- **网络设备管理** - 交换机、路由器配置工具

### 相关知识
- **网络基础** - TCP/IP 协议、IP 地址、子网掩码等
- **网络安全** - 防火墙、VPN、入侵检测等
- **网络设备** - 路由器、交换机、防火墙等设备原理
- **网络设计** - 网络拓扑、架构设计、性能优化

## 自定义网站

### 1. 修改基本信息

- 在 `index.html`、`about.html`、`contact.html` 中修改网站标题、描述等
- 替换页脚中的社交媒体链接

### 2. 添加新内容

复制 `post1.html` 并重命名为新的文件名（如 `post5.html`），然后修改文章内容。

在 `index.html` 中添加新的文章卡片到对应分类区域：

```html
<article class="post-card">
    <!-- 文章内容 -->
</article>
```

### 3. 修改颜色主题

在 `styles.css` 中修改 CSS 变量：

```css
:root {
    --primary-color: #3b82f6; /* 修改主色调 */
    /* ... */
}
```

### 4. 添加自己的图片

在 HTML 文件中替换 `<img>` 标签的 `src` 属性，或者替换 `avatar-wrapper` 等占位图标。

## 主要页面说明

### 首页 (index.html)
- 展示软件学习和相关知识两个分类
- 英雄区域介绍
- 文章卡片展示

### 文章页面 (post1.html)
- 完整文章内容展示
- 文章元数据（分类、日期、阅读时间）
- 作者信息
- 分享功能
- 文章导航

### 关于页面 (about.html)
- 知识库介绍
- 内容分类说明
- 学习路径图
- 联系方式

### 联系页面 (contact.html)
- 联系信息展示
- 联系表单（带验证）
- 常见问题解答

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 后续扩展建议

1. **添加搜索功能** - 实现内容搜索
2. **评论系统** - 添加文章评论功能
3. **RSS 订阅** - 提供内容更新通知
4. **后台管理** - 添加内容管理系统
5. **SEO 优化** - 优化搜索引擎排名
6. **学习进度追踪** - 为用户添加学习进度管理

## 许可证

MIT License - 自由使用和修改。

## 联系方式

如果有问题或建议，欢迎通过以下方式联系：
- GitHub: [github.com/networkkb]
- Email: contact@networkkb.com

---

愿您在这里获得有价值的网络技术知识！🎉

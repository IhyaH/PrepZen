# PrepZen

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white" alt="Cloudflare Workers">
</div>

<div align="center">
  <h3>🎓 专注高效的在线刷题平台</h3>
  <p><strong>Prep (准备) + Zen (禅)</strong></p>
  <p>寓意系统能帮助学生达到一种专注、高效的备考状态</p>
</div>

## ✨ 项目简介

PrepZen 是一个专为大学生设计的全栈在线刷题系统，采用现代化的技术栈，提供从题库管理到在线练习的完整解决方案。系统支持多种题型、实时统计、错题回顾等功能，帮助学生高效备考。

## 🚀 功能特色

### 📚 多样化题库管理
- **题库管理脚本**：Python脚本支持题库的添加和更新
- **多领域题库**：包含工程概预算、电力法律等专业题库
- **可扩展设计**：支持轻松添加新的题库
- **数据统计**：自动更新题目统计信息

### 🎯 智能答题体验
- **多种题型**：单选题、多选题、判断题
- **灵活配置**：自定义题目数量（10/20/50/全部）
- **题型筛选**：按需选择特定题型练习
- **实时反馈**：即时显示答题结果

### 📊 学习辅助工具
- **思维导图生成**：自动生成知识体系思维导图
- **学习数据统计**：实时计算答题准确率
- **错题回顾**：智能收集错题，支持重复练习
- **答题报告**：生成详细的答题结果分析

### 🚀 部署与扩展
- **Cloudflare Workers**：支持无服务器部署
- **现代化前端**：基于Tailwind CSS的响应式界面
- **模块化架构**：易于功能扩展和维护

## 🛠️ 技术栈

- **前端**：HTML5 + CSS3 + JavaScript
- **样式框架**：Tailwind CSS
- **后端脚本**：Python 3
- **部署平台**：Cloudflare Workers
- **数据格式**：JSON
- **图标库**：Font Awesome
- **字体**：Google Fonts (Noto Sans SC)

## 📁 项目结构（更新版）

```
PrepZen/
├── .gitattributes                       # Git 属性配置
├── README.md                            # 项目说明文档
├── PrepZen.zip                          # 项目压缩包
└── prepzen/                             # 项目主目录
    ├── add_question_bank.py             # 题库添加脚本
    ├── generate_mindmaps.py             # 思维导图生成脚本
    ├── update_question_stats.py         # 题目统计更新脚本
    ├── package-lock.json                # npm 依赖锁文件
    ├── package.json                     # npm 项目配置
    ├── wrangler.jsonc                   # Cloudflare Workers配置
    └── public/                          # 前端资源
        ├── index.html                   # 项目首页
        ├── practice.html                # 答题页面
        ├── project-architecture.html    # 项目架构图
        ├── protect.js                   # 保护脚本
        └── data/                        # 题库数据
            ├── question-loader.js       # 题目加载器
            ├── dianli-falv-questions.json      # 电力法律题库
            ├── engineering-budget-questions.json # 工程概预算题库
            ├── jdbh-questions.json              # 机电保护题库
            ├── sample-questions.json            # 示例题库
            └── zndw-questions.json              # 智能电网题库
```

## 🚀 快速开始（更新版）

### 在线体验
1. 访问项目首页：[index.html](prepzen/public/index.html)
2. 点击「开始刷题」按钮
3. 选择题库、题型和题目数量
4. 开始答题练习

### 本地部署
1. **克隆项目**
   ```bash
   git clone https://github.com/IhyaH/PrepZen.git
   cd PrepZen
   ```

2. **安装依赖**
   ```bash
   cd prepzen
   npm install
   ```

3. **启动服务**
   ```bash
   # 使用 Node.js
   npx serve .

   # 或使用 Python
   python -m http.server 8000
   ```

4. **访问应用**
   - 打开浏览器访问 `http://localhost:3000` (Node.js) 或 `http://localhost:8000` (Python)
   - 或直接双击 `public/index.html` 文件

### Cloudflare Workers 部署
1. 安装 [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
2. 配置wrangler.jsonc
3. 部署到Cloudflare
   ```bash
   cd prepzen
   wrangler deploy
   ```

## 📖 使用指南

### 题库管理
1. **添加新题库**：
   ```bash
   python add_question_bank.py 新题库名称
   ```
2. **更新统计信息**：
   ```bash
   python update_question_stats.py
   ```
3. **生成思维导图**：
   ```bash
   python generate_mindmaps.py
   ```

### 前端开发
1. **修改样式**：编辑 `public/` 目录下的CSS文件
2. **添加功能**：修改 `public/` 目录下的JavaScript文件
3. **添加页面**：在 `public/` 目录创建新的HTML文件

## 📝 题库格式

题库采用标准 JSON 格式：
```json
{
  "subject": "科目名称",
  "description": "题库描述",
  "version": "1.0",
  "lastUpdated": "2024-12-24",
  "questions": [
    {
      "type": "单选题",
      "question": "题目内容",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "answer": "B"
    },
    {
      "type": "多选题",
      "question": "题目内容",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "answer": ["A", "C"]
    }
  ]
}
```

## 🔧 自定义开发

### 添加新题库
1. 在 `prepzen/public/data/` 目录创建新的 JSON 文件
2. 按照标准格式添加题目数据
3. 在 `question-loader.js` 中注册新题库
4. 运行题库添加脚本：`python add_question_bank.py 新题库名称`

### 扩展功能
- **新题型支持**：在答题逻辑中添加新的题型处理
- **用户系统**：添加用户注册、登录和学习记录功能
- **API扩展**：创建REST API支持移动端访问
- **数据分析**：添加学习行为分析功能

## 🎯 适用场景

- **期末考试**：课程知识点强化练习
- **资格认证**：专业资格考试备考
- **教学实验**：教师课堂练习工具
- **知识管理**：构建专业知识体系
- **团队培训**：企业员工技能考核

## 🤝 贡献指南

欢迎贡献代码、题库或提出改进建议！

1. **Fork 项目**
2. **创建功能分支** (`git checkout -b feature/NewFeature`)
3. **提交更改** (`git commit -m 'Add NewFeature'`)
4. **推送分支** (`git push origin feature/NewFeature`)
5. **创建 Pull Request**

### 贡献类型
- 🐛 Bug 修复
- ✨ 新功能开发
- 📚 题库内容补充
- 📖 文档完善
- 🎨 界面优化
- ⚡ 性能提升

## 📄 开源协议

本项目采用 MIT 协议开源，详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Tailwind CSS](https://tailwindcss.com/) - 现代化的 CSS 框架
- [Cloudflare Workers](https://workers.cloudflare.com/) - 无服务器部署平台
- [Font Awesome](https://fontawesome.com/) - 图标库
- [Python](https://www.python.org/) - 脚本语言

## 👨‍💻 作者信息

**IhyaH** - 项目创建者和维护者

- 📧 Email: ihyah@foxmail.com
- 🐙 GitHub: [https://github.com/IhyaH](https://github.com/IhyaH)
- 🐛 Issues: [GitHub Issues](https://github.com/IhyaH/PrepZen/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/IhyaH/PrepZen/discussions)

---
<div align="center">
  <p>⭐ 如果这个项目对你有帮助，请给它一个星标！</p>
  <p>🎓 <strong>PrepZen - 专注学习，成就未来</strong> 🎓</p>
</div>

# PrepZen

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</div>

<div align="center">
  <h3>🎓 专注高效的在线刷题平台</h3>
  <p><strong>Prep (准备) + Zen (禅)</strong></p>
  <p>寓意系统能帮助学生达到一种专注、高效的备考状态</p>
</div>

## ✨ 项目简介

PrepZen 是一个专为大学生设计的在线刷题系统，采用现代化的前端技术栈，提供流畅的学习体验。系统支持多种题型、实时统计、错题回顾等功能，帮助学生高效备考。

## 🚀 功能特色

### 📚 多样化题库
- **工程概预算专业题库**：644道精选题目，涵盖工程造价核心知识
- **示例题库**：演示系统功能的多领域题目
- **可扩展设计**：支持轻松添加新的题库

### 🎯 智能答题体验
- **多种题型**：单选题、多选题、判断题
- **灵活配置**：自定义题目数量（10/20/50/全部）
- **题型筛选**：按需选择特定题型练习
- **实时反馈**：即时显示答题结果

### 📊 学习数据统计
- **实时进度**：动态显示答题进度条
- **正确率统计**：实时计算答题准确率
- **成绩分析**：详细的答题结果报告
- **错题回顾**：智能收集错题，支持重复练习

### 💻 现代化界面
- **响应式设计**：完美适配手机、平板、电脑
- **美观UI**：基于 Tailwind CSS 的现代化界面
- **流畅交互**：优化的用户体验和动画效果
- **无障碍访问**：良好的可访问性设计

## 🛠️ 技术栈

- **前端框架**：原生 HTML5 + CSS3 + JavaScript
- **样式框架**：Tailwind CSS
- **图标库**：Font Awesome
- **字体**：Google Fonts (Noto Sans SC)
- **数据格式**：JSON
- **架构模式**：模块化设计

## 📁 项目结构

```
PrepZen/
├── index.html                          # 项目首页
├── Interactive-Practice-for-Engineering-Estimation-and-Budgeting.html  # 答题系统主页面
├── README.md                            # 项目说明文档
├── .gitattributes                       # Git 属性配置
└── data/                                # 数据目录
    ├── question-loader.js               # 题目数据加载器
    ├── engineering-budget-questions.json # 工程概预算题库
    └── sample-questions.json            # 示例题库
```

## 🚀 快速开始

### 在线体验
1. 访问项目首页：`index.html`
2. 点击「开始刷题」按钮
3. 选择题库、题型和题目数量
4. 开始答题练习

### 本地部署
1. **克隆项目**
   ```bash
   git clone https://github.com/IhyaH/PrepZen.git
   cd PrepZen
   ```

2. **启动服务**
   ```bash
   # 使用 Python 启动本地服务器
   python -m http.server 8000
   
   # 或使用 Node.js
   npx serve .
   ```

3. **访问应用**
   - 打开浏览器访问 `http://localhost:8000`
   - 或直接双击 `index.html` 文件

## 📖 使用指南

### 基本操作
1. **选择题库**：在首页选择想要练习的题库
2. **配置练习**：选择题型（单选/多选/判断/全部）和题目数量
3. **开始答题**：点击选项进行答题，点击「确认答案」提交
4. **查看结果**：实时查看正确率和答题进度
5. **错题回顾**：练习结束后可重新练习错题

### 高级功能
- **自定义题库**：在 `data/` 目录添加新的 JSON 题库文件
- **题目格式**：参考现有题库的 JSON 格式添加题目
- **样式定制**：修改 CSS 样式实现个性化界面

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
    },
    {
      "type": "判断题",
      "question": "题目内容",
      "options": ["正确", "错误"],
      "answer": "正确"
    }
  ]
}
```

## 🔧 自定义开发

### 添加新题库
1. 在 `data/` 目录创建新的 JSON 文件
2. 按照标准格式添加题目数据
3. 在 `question-loader.js` 中注册新题库
4. 更新界面中的题库选择器

### 扩展功能
- **新题型支持**：在答题逻辑中添加新的题型处理
- **数据统计**：扩展学习数据的统计和分析功能
- **用户系统**：添加用户注册、登录和学习记录功能
- **社交功能**：添加题目分享、讨论等社交元素

## 🎯 适用场景

- **期末复习**：课程知识点巩固练习
- **资格考试**：专业资格认证备考
- **知识检测**：学习效果自我评估
- **教学辅助**：教师课堂练习和作业布置
- **团队学习**：小组学习和知识竞赛

## 🤝 贡献指南

欢迎贡献代码、题库或提出改进建议！

1. **Fork 项目**
2. **创建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送分支** (`git push origin feature/AmazingFeature`)
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
- [Font Awesome](https://fontawesome.com/) - 优秀的图标库
- [Google Fonts](https://fonts.google.com/) - 网页字体服务

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

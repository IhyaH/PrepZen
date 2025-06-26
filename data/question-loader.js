/**
 * 题目数据加载器
 * 用于动态加载不同科目的题目数据
 */
class QuestionLoader {
    constructor() {
        this.cache = new Map();
    }

    /**
     * 加载题目数据
     * @param {string} subject - 科目名称（如：'engineering-budget'）
     * @returns {Promise<Object>} 题目数据对象
     */
    async loadQuestions(subject) {
        // 检查缓存
        if (this.cache.has(subject)) {
            return this.cache.get(subject);
        }

        try {
            const response = await fetch(`./data/${subject}-questions.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // 验证数据格式
            if (!data.questions || !Array.isArray(data.questions)) {
                throw new Error('Invalid question data format');
            }
            
            // 缓存数据
            this.cache.set(subject, data);
            
            return data;
        } catch (error) {
            console.error(`Failed to load questions for subject: ${subject}`, error);
            throw error;
        }
    }

    /**
     * 获取可用的科目列表
     * @returns {Array<Object>} 科目列表
     */
    getAvailableSubjects() {
        return [
            {
                id: 'engineering-budget',
                name: '工程概预算',
                description: '工程概预算练习题库',
                file: 'engineering-budget-questions.json'
            }
            // 可以在这里添加更多科目
            // {
            //     id: 'construction-management',
            //     name: '建筑工程管理',
            //     description: '建筑工程管理练习题库',
            //     file: 'construction-management-questions.json'
            // }
        ];
    }

    /**
     * 按题型过滤题目
     * @param {Array} questions - 题目数组
     * @param {string} type - 题型（'单选题'、'多选题'、'判断题'、'all'）
     * @returns {Array} 过滤后的题目数组
     */
    filterByType(questions, type) {
        if (type === 'all') {
            return questions;
        }
        return questions.filter(q => q.type === type);
    }

    /**
     * 随机打乱题目顺序
     * @param {Array} questions - 题目数组
     * @returns {Array} 打乱后的题目数组
     */
    shuffleQuestions(questions) {
        const shuffled = [...questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * 获取指定数量的题目
     * @param {Array} questions - 题目数组
     * @param {number|string} count - 题目数量或'all'
     * @returns {Array} 选取的题目数组
     */
    selectQuestions(questions, count) {
        if (count === 'all') {
            return questions;
        }
        
        const num = parseInt(count, 10);
        if (isNaN(num) || num <= 0) {
            return questions;
        }
        
        return questions.slice(0, Math.min(num, questions.length));
    }

    /**
     * 清除缓存
     * @param {string} subject - 科目名称（可选，不传则清除所有缓存）
     */
    clearCache(subject) {
        if (subject) {
            this.cache.delete(subject);
        } else {
            this.cache.clear();
        }
    }
}

// 创建全局实例
window.questionLoader = new QuestionLoader();
/**
 * 题目数据加载器
 * 用于动态加载不同科目的题目数据
 */
class QuestionLoader {
    constructor() {
        this.cache = new Map();
    }

    /**
     * 加载题目数据（需要密码验证）
     * @param {string} subject - 科目名称（如：'engineering-budget'）
     * @param {string} password - 题库密码
     * @returns {Promise<Object>} 题目数据对象
     */
    async loadQuestions(subject, password = null) {
        // 检查缓存（包含密码验证状态）
        const cacheKey = `${subject}_verified`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
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
            
            // 密码验证
            if (data.password) {
                if (!password) {
                    throw new Error('PASSWORD_REQUIRED');
                }
                if (password !== data.password) {
                    throw new Error('INVALID_PASSWORD');
                }
            }
            
            // 缓存验证通过的数据
            this.cache.set(cacheKey, data);
            
            return data;
        } catch (error) {
            console.error(`Failed to load questions for subject: ${subject}`, error);
            throw error;
        }
    }

    /**
     * 获取题库基本信息（不需要密码）
     * @param {string} subject - 科目名称
     * @returns {Promise<Object>} 题库基本信息
     */
    async getQuestionBankInfo(subject) {
        try {
            const response = await fetch(`./data/${subject}-questions.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // 返回基本信息，包含题型统计
            return {
                subject: data.subject,
                description: data.description,
                version: data.version,
                lastUpdated: data.lastUpdated,
                hasPassword: !!data.password,
                passwordHint: data.passwordHint || '请输入题库密码',
                questionCount: data.questions ? data.questions.length : 0,
                questionStats: data.questionStats || {
                    totalQuestions: data.questions ? data.questions.length : 0,
                    questionTypesCount: {
                        "单选题": 0,
                        "多选题": 0,
                        "判断题": 0,
                        "填空题": 0,
                        "简答题": 0
                    }
                }
            };
        } catch (error) {
            console.error(`Failed to get info for subject: ${subject}`, error);
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
                id: 'sample',
                name: '示例题库',
                description: '示例题库，用于测试',
                file: 'sample-questions.json',
                iconClass: 'fas fa-code',
                bgColorClass: 'bg-orange-100',
                textColorClass: 'text-orange-600'
            }
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
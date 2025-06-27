import json
import os
from collections import defaultdict

def update_question_stats(file_path):
    """
    读取题库JSON文件，统计每种类型题目的数量和总题目数量，
    并将统计信息添加到JSON文件的顶部。
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        questions = data.get('questions', [])
        
        # 统计每种题型数量
        type_counts = defaultdict(int)
        for question in questions:
            q_type = question.get('type')
            if q_type:
                type_counts[q_type] += 1
        
        total_questions = len(questions)

        # 构建统计信息字典
        stats = {
            "totalQuestions": total_questions,
            "questionTypesCount": dict(type_counts)
        }

        # 将统计信息添加到JSON数据顶部
        # 检查是否已存在，如果存在则更新，否则添加
        if 'questionStats' in data:
            data['questionStats'].update(stats)
        else:
            # 插入到 subject 字段之后
            new_data = {}
            for k, v in data.items():
                new_data[k] = v
                if k == 'subject':
                    new_data['questionStats'] = stats
            data = new_data

        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"成功更新文件: {file_path}")
        print(f"统计信息: {json.dumps(stats, ensure_ascii=False, indent=2)}")

    except FileNotFoundError:
        print(f"错误: 文件未找到 - {file_path}")
    except json.JSONDecodeError:
        print(f"错误: 无效的JSON格式 - {file_path}")
    except Exception as e:
        print(f"处理文件 {file_path} 时发生错误: {e}")

if __name__ == "__main__":
    # 题库文件路径列表
    # 假设脚本在项目根目录运行，题库在 data/ 目录下
    question_bank_files = [
        'data/sample-questions.json',
        'data/engineering-budget-questions.json',
        'data/jdbh-questions.json'
    ]

    for file in question_bank_files:
        update_question_stats(file)

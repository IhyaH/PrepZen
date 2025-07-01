import json
import os
from openai import OpenAI
import time

def load_question_bank(file_path):
    """加载题库JSON文件"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_question_bank(file_path, data):
    """保存更新后的题库JSON文件"""
    # 创建备份
    backup_path = f"{file_path}.backup"
    if not os.path.exists(backup_path):
        with open(backup_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"已创建备份文件: {backup_path}")

    # 保存更新后的数据
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"已更新题库文件: {file_path}")

def generate_mindmap(client, question_content, answer_content):
    """调用大模型生成Mermaid思维导图"""
    prompt = f"""
请根据以下简答题的题目和答案，生成一个便于记忆的Mermaid思维导图，仅返回Mermaid代码，不要包含任何解释或额外文本。

要求：
1. 使用graph TD格式，节点使用中文
2. 突出核心概念和关键知识点，层次结构清晰
3. 适当使用颜色标记重要程度（如红色表示核心，蓝色表示扩展）
4. 节点内容简洁易记，优先使用关键词而非完整句子

题目: {question_content}
答案: {answer_content}
    """

    extra_body = {
        "enable_thinking": True,
    }

    try:
        response = client.chat.completions.create(
            model='Qwen/Qwen3-235B-A22B',
            messages=[
                {
                    'role': 'user',
                    'content': prompt
                }
            ],
            stream=True,
            extra_body=extra_body
        )

        done_thinking = False
        mindmap_code = ""
        for chunk in response:
            thinking_chunk = chunk.choices[0].delta.reasoning_content
            answer_chunk = chunk.choices[0].delta.content
            if thinking_chunk != '' and not done_thinking:
                # 忽略思考过程输出
                pass
            elif answer_chunk != '':
                if not done_thinking:
                    done_thinking = True
                mindmap_code += answer_chunk

        # 确保只返回Mermaid代码，移除可能的格式标记
        if mindmap_code.startswith('```mermaid'):
            mindmap_code = mindmap_code[len('```mermaid'):-3].strip()
        elif mindmap_code.startswith('```'):
            mindmap_code = mindmap_code[3:-3].strip()

        return mindmap_code

    except Exception as e:
        print(f"生成思维导图时出错: {str(e)}")
        return None

def process_question_bank(file_path):
    """处理题库文件，为所有简答题生成思维导图"""
    # 初始化OpenAI客户端
    client = OpenAI(
        base_url='https://api-inference.modelscope.cn/v1/',
        api_key='6f799b3f-2421-4c1a-84e2-4d130116d0b3',  # ModelScope Token
    )

    # 加载题库
    question_bank = load_question_bank(file_path)
    questions = question_bank.get('questions', [])
    processed_count = 0

    # 处理每个问题
    for q in questions:
        # 只处理简答题且尚未生成思维导图的问题
        if q.get('type') == '简答题' and 'mindmap' not in q:
            print(f"处理问题: {q.get('question', '未命名问题')}")
            # 获取答案内容，兼容不同字段名
            answer_content = q.get('answer', q.get('explanation', ''))
            mindmap = generate_mindmap(client, q.get('question', ''), answer_content)
            if mindmap:
                q['mindmap'] = mindmap
                processed_count += 1
                print("思维导图生成成功")
                # 添加延迟，避免API调用过于频繁
                time.sleep(2)
            else:
                print("思维导图生成失败，跳过该问题")

    # 保存更新后的题库
    if processed_count > 0:
        save_question_bank(file_path, question_bank)
        print(f"处理完成，共为 {processed_count} 个简答题生成了思维导图")
    else:
        print("没有需要处理的简答题或所有简答题都已生成思维导图")

if __name__ == '__main__':
    # 默认处理sample-questions.json题库
    default_bank_path = os.path.join('data', 'jdbh-questions.json')
    # 检查文件是否存在
    if os.path.exists(default_bank_path):
        process_question_bank(default_bank_path)
    else:
        print(f"默认题库文件不存在: {default_bank_path}")
        print("请指定正确的题库文件路径")
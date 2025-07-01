import json
import os
import datetime

def add_question_bank(bank_id, bank_name, description, password="", password_hint=""):
    """
    添加一个新的题库JSON文件，并更新question-loader.js。
    """
    # 1. 创建新的题库JSON文件
    file_name = f"{bank_id}-questions.json"
    file_path = os.path.join('data', file_name)

    if os.path.exists(file_path):
        print(f"错误: 题库文件 '{file_path}' 已存在。请使用不同的ID。")
        return

    new_bank_content = {
        "subject": bank_name,
        "description": description,
        "version": "1.0.0",
        "lastUpdated": datetime.datetime.now().strftime("%Y-%m-%d"),
        "password": password,
        "passwordHint": password_hint,
        "questions": []
    }

    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(new_bank_content, f, ensure_ascii=False, indent=2)
        print(f"成功创建题库文件: {file_path}")
    except Exception as e:
        print(f"创建题库文件失败: {e}")
        return

    # 2. 更新 question-loader.js
    question_loader_path = os.path.join('data', 'question-loader.js')
    try:
        with open(question_loader_path, 'r', encoding='utf-8') as f:
            loader_content = f.read()

        # 构建新的题库入口字符串
        new_subject_entry = f"""            {{
                id: '{bank_id}',
                name: '{bank_name}',
                description: '{description}',
                file: '{file_name}'
            }}"""
        
        # 查找插入点
        # 寻找 "可以在这里添加更多科目" 注释或最后一个科目条目
        insert_marker = "// 可以在这里添加更多科目"
        last_subject_pattern = r"(\s*\{\s*id:\s*'.*?',\s*name:\s*'.*?',\s*description:\s*'.*?',\s*file:\s*'.*?'\s*\})"
        
        if insert_marker in loader_content:
            # 插入到注释之前
            updated_content = loader_content.replace(insert_marker, f"{new_subject_entry},\n{insert_marker}")
        else:
            # 尝试在最后一个科目条目之后添加逗号并插入
            import re
            match = re.search(last_subject_pattern + r'\s*\];', loader_content, re.DOTALL)
            if match:
                # 确保在最后一个条目后添加逗号
                updated_content = loader_content.replace(match.group(1), f"{match.group(1)},\n{new_subject_entry}")
            else:
                print("警告: 未找到合适的插入点，请手动更新 question-loader.js。")
                return

        with open(question_loader_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"成功更新 {question_loader_path}")

    except FileNotFoundError:
        print(f"错误: {question_loader_path} 未找到。")
    except Exception as e:
        print(f"更新 {question_loader_path} 失败: {e}")

    # 3. 运行统计脚本 (可选，但推荐)
    print("\n正在运行题目统计脚本以初始化新题库的统计信息...")
    try:
        import subprocess
        subprocess.run(["python", "update_question_stats.py"], check=True)
        print("题目统计脚本运行成功。")
    except FileNotFoundError:
        print("警告: update_question_stats.py 脚本未找到，请确保它在当前目录下。")
    except subprocess.CalledProcessError as e:
        print(f"错误: 题目统计脚本运行失败: {e}")
    except Exception as e:
        print(f"运行题目统计脚本时发生未知错误: {e}")

if __name__ == "__main__":
    print("--- 添加新题库脚本 ---")
    bank_id = input("请输入新题库的ID (例如: my-new): ").strip()
    bank_name = input("请输入新题库的名称 (例如: 我的新题库): ").strip()
    description = input("请输入新题库的描述: ").strip()
    
    needs_password = input("新题库是否需要密码？(y/n): ").strip().lower()
    password = ""
    password_hint = ""
    if needs_password == 'y':
        password = input("请输入密码: ").strip()
        password_hint = input("请输入密码提示 (可选): ").strip()

    if not bank_id or not bank_name or not description:
        print("ID、名称和描述不能为空。")
    else:
        add_question_bank(bank_id, bank_name, description, password, password_hint)

import os
import re

dirs = [
    'docs/stay-the-course',
    'docs/en/stay-the-course',
    'knowledge-base/투자_진화론',
    'knowledge-base/거시경제_생존기'
]

# Replacements for Prologue ~ Chapter 9
# Korean
reps_1_ko = {
    "삼위일체(Trinity) 코어": "팩터 코어(Factor Core)",
    "'삼위일체'": "'팩터 코어'",
    "삼위일체 코어": "팩터 코어",
    "삼위일체": "팩터 코어"
}
# English
reps_1_en = {
    "'Trinity Core'": "'Factor Core'",
    "'Trinity'": "'Factor Core'",
    "Trinity Core": "Factor Core",
    "Trinity": "Factor Core"
}

# Replacements for Chapter 10 ~ Epilogue
# Korean
reps_2_ko = {
    "삼위일체(Trinity) 코어": "안티프래질 코어",
    "삼위일체 코어(Trinity Core)": "안티프래질 코어(Antifragile Core)",
    "삼위일체 코어": "안티프래질 코어",
    "삼위일체 바벨": "안티프래질 바벨",
    "'삼위일체'": "'안티프래질 코어'",
    "삼위일체": "안티프래질 코어"
}
# English
reps_2_en = {
    "Trinity Core": "Antifragile Core",
    "Trinity Barbell": "Antifragile Barbell",
    "'Trinity'": "'Antifragile Core'",
    "Trinity": "Antifragile Core"
}

for d in dirs:
    if not os.path.exists(d): continue
    for root, _, files in os.walk(d):
        for f in files:
            if not f.endswith('.md'): continue
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            orig = content
            
            # Determine if part 1 (ch0-9) or part 2 (ch10+)
            # Note: 015 is ch10, 016 is epilogue. For KB: 10장, 99장. 거시경제: 1장, 6장 etc.
            is_ch10_plus = False
            if '015' in f or '016' in f or '10장' in f or '99장' in f or '에필로그' in f:
                is_ch10_plus = True
                
            is_en = '/en/' in path

            if not is_ch10_plus:
                reps = reps_1_en if is_en else reps_1_ko
            else:
                reps = reps_2_en if is_en else reps_2_ko
                
            for k, v in reps.items():
                content = content.replace(k, v)
                
            if content != orig:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(content)
                print(f"Updated {path}")

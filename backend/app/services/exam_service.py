import random

from app.utils.db import get_db


def get_all_questions():
    """Return every exam question."""
    return get_db().read("exam_questions")


def get_random_questions(count=30):
    """Return a random sample of *count* questions."""
    questions = get_db().read("exam_questions")
    if len(questions) <= count:
        random.shuffle(questions)
        return questions
    return random.sample(questions, count)


def get_categories():
    """Return a list of categories with question counts."""
    questions = get_db().read("exam_questions")
    counts = {}
    for q in questions:
        cat = q.get("category", "Uncategorized")
        counts[cat] = counts.get(cat, 0) + 1
    return [{"category": cat, "count": cnt} for cat, cnt in sorted(counts.items())]


def filter_questions(category=None, difficulty=None):
    """Filter questions by category and/or difficulty."""
    questions = get_db().read("exam_questions")
    if category:
        questions = [q for q in questions if q.get("category") == category]
    if difficulty:
        questions = [q for q in questions if q.get("difficulty") == difficulty]
    return questions

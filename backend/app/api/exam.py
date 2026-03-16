from flask import Blueprint, jsonify, request

from ..services.exam_service import (
    get_all_questions,
    get_random_questions,
    get_categories,
    filter_questions,
)

exam_bp = Blueprint("exam", __name__, url_prefix="/api/exam")


@exam_bp.route("/questions")
def list_questions():
    category = request.args.get("category")
    difficulty = request.args.get("difficulty")

    if category or difficulty:
        questions = filter_questions(category=category, difficulty=difficulty)
    else:
        questions = get_all_questions()

    return jsonify(questions)


@exam_bp.route("/questions/random")
def random_questions():
    count = request.args.get("count", 30, type=int)
    questions = get_random_questions(count)
    return jsonify(questions)


@exam_bp.route("/categories")
def list_categories():
    categories = get_categories()
    return jsonify(categories)

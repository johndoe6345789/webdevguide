from flask import Blueprint, jsonify, request

from ..services.glossary_service import (
    get_all_terms,
    get_categories,
    search_terms,
)

glossary_bp = Blueprint("glossary", __name__, url_prefix="/api/glossary")


@glossary_bp.route("/terms")
def list_terms():
    category = request.args.get("category")
    if category:
        terms = [t for t in get_all_terms() if t.get("category") == category]
    else:
        terms = get_all_terms()
    return jsonify(terms)


@glossary_bp.route("/categories")
def list_categories():
    categories = get_categories()
    return jsonify(categories)


@glossary_bp.route("/search")
def search():
    query = request.args.get("q", "")
    if not query:
        return jsonify([])
    results = search_terms(query)
    return jsonify(results)

from flask import Blueprint, jsonify

from ..services.guide_service import (
    get_all_sections,
    get_section_by_slug,
    get_navigation,
)

guide_bp = Blueprint("guide", __name__, url_prefix="/api/guide")


@guide_bp.route("/sections")
def list_sections():
    sections = get_all_sections()
    summary = [
        {
            "id": s["id"],
            "title": s["title"],
            "slug": s["slug"],
            "description": s.get("description", ""),
            "icon": s.get("icon", ""),
            "order": s.get("order", 0),
            "estimatedMinutes": s.get("estimatedMinutes", 0),
            "difficulty": s.get("difficulty", "beginner"),
        }
        for s in sections
    ]
    return jsonify(summary)


@guide_bp.route("/sections/<slug>")
def get_section(slug):
    section = get_section_by_slug(slug)
    if section is None:
        return jsonify({"error": "Section not found"}), 404
    return jsonify(section)


@guide_bp.route("/navigation")
def navigation():
    nav = get_navigation()
    return jsonify(nav)

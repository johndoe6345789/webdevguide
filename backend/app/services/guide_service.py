from app.utils.db import get_db


def get_all_sections():
    """Return all guide sections sorted by order."""
    sections = get_db().read("guide_sections")
    return sorted(sections, key=lambda s: s.get("order", 0))


def get_section_by_slug(slug):
    """Return a single section by its slug, or None."""
    return get_db().find_one("guide_sections", lambda s: s.get("slug") == slug)


def get_navigation():
    """Return a lightweight navigation structure."""
    sections = get_all_sections()
    return [
        {
            "id": s.get("id"),
            "title": s["title"],
            "slug": s["slug"],
            "order": s.get("order", 0),
            "icon": s.get("icon", ""),
        }
        for s in sections
    ]

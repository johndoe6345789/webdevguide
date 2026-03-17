from app.utils.db import get_db


def get_all_terms():
    """Return all glossary terms sorted alphabetically."""
    terms = get_db().read("glossary_terms")
    return sorted(terms, key=lambda t: t.get("term", "").lower())


def get_categories():
    """Return a deduplicated sorted list of term categories."""
    terms = get_db().read("glossary_terms")
    categories = sorted({t.get("category", "General") for t in terms})
    return [{"category": c} for c in categories]


def search_terms(query):
    """Search terms by name and definition (case-insensitive)."""
    q = query.lower()

    def matches(t):
        return q in t.get("term", "").lower() or q in t.get("definition", "").lower()
    return get_db().find("glossary_terms", matches)

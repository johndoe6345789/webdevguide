import os
import json
import click
from flask import Flask, jsonify

from app.config import config_by_name
from app.extensions import cors
from app.utils.db import init_db


def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get("FLASK_ENV", "development")

    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config.from_object(config_by_name[config_name])

    cors.init_app(app)

    database = init_db(app)

    from app.api.guide import guide_bp
    from app.api.exam import exam_bp
    from app.api.glossary import glossary_bp

    app.register_blueprint(guide_bp)
    app.register_blueprint(exam_bp)
    app.register_blueprint(glossary_bp)

    @app.route("/api/health")
    def health():
        return jsonify({"status": "healthy"})

    def resolve_ref(base_dir, value):
        """Recursively resolve $ref pointers to their JSON content."""
        if isinstance(value, dict):
            if "$ref" in value:
                ref_path = os.path.join(base_dir, value["$ref"])
                ref_dir = os.path.dirname(ref_path)
                with open(ref_path, "r", encoding="utf-8") as f:
                    resolved = json.load(f)
                return resolve_ref(ref_dir, resolved)
            return {k: resolve_ref(base_dir, v) for k, v in value.items()}
        if isinstance(value, list):
            return [resolve_ref(base_dir, item) for item in value]
        return value

    @app.cli.command("seed-db")
    def seed_db():
        """Seed the database from seeds/data/index.json with $ref resolution."""
        seeds_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "seeds", "data")
        index_path = os.path.join(seeds_dir, "index.json")
        with open(index_path, "r", encoding="utf-8") as f:
            index = json.load(f)

        # ── Guide sections (resolve each $ref in sections map) ──
        sections = []
        for i, (slug, ref) in enumerate(index["sections"].items()):
            section = resolve_ref(seeds_dir, ref)
            section["id"] = str(i + 1)
            sections.append(section)
        database.write("guide_sections", sections)
        click.echo(f"Seeded {len(sections)} guide sections.")

        # ── Navigation (derived from sections) ──
        nav = [
            {"id": s["id"], "title": s["title"], "slug": s["slug"],
             "order": s.get("order", 0), "icon": s.get("icon", "")}
            for s in sorted(sections, key=lambda s: s.get("order", 0))
        ]
        database.write("navigation", nav)
        click.echo(f"Seeded navigation ({len(nav)} items).")

        # ── Exam questions ──
        questions = resolve_ref(seeds_dir, index["exam"])
        for i, q in enumerate(questions):
            q["id"] = f"q{i + 1}"
        database.write("exam_questions", questions)
        click.echo(f"Seeded {len(questions)} exam questions.")

        # ── Glossary terms ──
        terms = resolve_ref(seeds_dir, index["glossary"])
        database.write("glossary_terms", terms)
        click.echo(f"Seeded {len(terms)} glossary terms.")

    return app

#!/usr/bin/env python3
"""Entrypoint script: seeds the database then starts gunicorn."""
import os
import subprocess
import sys


def main():
    # Seed the database on startup
    print("Seeding database...")
    subprocess.run([sys.executable, "-m", "flask", "seed-db"], check=True, env={
        **os.environ,
        "FLASK_APP": "app:create_app",
    })
    print("Database seeded successfully.")

    # Start gunicorn
    host = os.environ.get("HOST", "0.0.0.0")
    port = os.environ.get("PORT", "5000")
    workers = os.environ.get("WEB_CONCURRENCY", "2")

    subprocess.run([
        "gunicorn",
        "--bind", f"{host}:{port}",
        "--workers", workers,
        "app:create_app()",
    ], check=True)


if __name__ == "__main__":
    main()

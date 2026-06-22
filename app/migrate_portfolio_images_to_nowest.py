"""
Migrate portfolio image URLs to correct nowest/collection S3 paths.
"""

import sys
from pathlib import Path

app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from config import settings
from utils.s3_utils import get_collection_file_map, resolve_portfolio_image_url


def _extract_filename(path: str) -> str:
    return path.split("?")[0].rstrip("/").split("/")[-1]


def migrate_portfolio_images() -> None:
    file_map = get_collection_file_map()
    print(f"Found {len(file_map)} images in nowest/collection/\n")

    engine = create_engine(settings.database_url, pool_pre_ping=True, echo=False)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()

    try:
        result = db.execute(
            text("SELECT id, title, image FROM portfolio WHERE image IS NOT NULL AND image != ''")
        )
        rows = result.fetchall()

        updated = 0
        cleared = 0
        skipped = 0

        print(f"Found {len(rows)} portfolio rows with images\n")

        for row in rows:
            portfolio_id, title, image = row[0], row[1], row[2]
            filename = _extract_filename(image)
            new_url = resolve_portfolio_image_url(image)

            if filename not in file_map:
                db.execute(
                    text("UPDATE portfolio SET image = NULL, updated_at = NOW() WHERE id = :id"),
                    {"id": portfolio_id},
                )
                cleared += 1
                print(f"[CLEARED] {title} - not in S3: {filename}")
                continue

            if new_url == image:
                skipped += 1
                continue

            db.execute(
                text("UPDATE portfolio SET image = :image, updated_at = NOW() WHERE id = :id"),
                {"image": new_url, "id": portfolio_id},
            )
            updated += 1
            print(f"[UPDATED] {title}")
            print(f"  Old: {image}")
            print(f"  New: {new_url}\n")

        db.commit()

        print("=" * 80)
        print(f"Migration complete: {updated} updated, {cleared} cleared, {skipped} unchanged")
        print("=" * 80)

    except Exception as exc:
        db.rollback()
        print(f"[ERROR] Migration failed: {exc}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    migrate_portfolio_images()

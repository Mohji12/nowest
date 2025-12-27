"""Quick script to get a portfolio image URL."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from config import settings

engine = create_engine(settings.database_url, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()

result = db.execute(text("SELECT image FROM portfolio WHERE image IS NOT NULL AND image LIKE '%Nowest_Image%' LIMIT 1"))
row = result.fetchone()

if row:
    print(row[0])
else:
    print("No portfolio image found")

db.close()












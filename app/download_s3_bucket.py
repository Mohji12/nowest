"""
Download all files from an S3 bucket, preserving folder structure locally.

Requirements:
    pip install boto3

AWS credentials (one of):
    aws configure
    AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY environment variables

Usage:
    python download_s3_bucket.py
    python download_s3_bucket.py --bucket nowest
    python download_s3_bucket.py --bucket nowest --output ../s3_downloads/nowest
    python download_s3_bucket.py --bucket nowest --prefix collection/
    python download_s3_bucket.py --all-buckets
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import boto3
from botocore.exceptions import ClientError, NoCredentialsError

app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

DEFAULT_BUCKET = "nowest"
DEFAULT_OUTPUT = app_dir.parent / "s3_downloads"
REGION = "ap-south-1"

ALL_BUCKETS = [
    "nowest",
    "jgi-menteetracker",
    "jgi-menteetrackers",
]


def list_objects(s3_client, bucket: str, prefix: str = "") -> list[dict]:
    objects: list[dict] = []
    paginator = s3_client.get_paginator("list_objects_v2")
    kwargs = {"Bucket": bucket}
    if prefix:
        kwargs["Prefix"] = prefix

    for page in paginator.paginate(**kwargs):
        for obj in page.get("Contents", []):
            key = obj["Key"]
            if key.endswith("/"):
                continue
            objects.append({"key": key, "size": obj["Size"]})

    return objects


def download_bucket(
    bucket: str,
    output_dir: Path,
    prefix: str = "",
    skip_existing: bool = True,
) -> tuple[int, int, int]:
    s3_client = boto3.client("s3", region_name=REGION)
    objects = list_objects(s3_client, bucket, prefix)

    if not objects:
        print(f"No files found in s3://{bucket}/{prefix}")
        return 0, 0, 0

    downloaded = 0
    skipped = 0
    failed = 0
    total_bytes = sum(obj["size"] for obj in objects)

    print(f"\nBucket: {bucket}")
    print(f"Output: {output_dir}")
    print(f"Files:  {len(objects)} ({total_bytes / (1024 * 1024):.2f} MB)\n")

    bucket_dir = output_dir / bucket
    bucket_dir.mkdir(parents=True, exist_ok=True)

    for index, obj in enumerate(objects, start=1):
        key = obj["key"]
        local_path = bucket_dir / key
        local_path.parent.mkdir(parents=True, exist_ok=True)

        if skip_existing and local_path.exists() and local_path.stat().st_size == obj["size"]:
            skipped += 1
            continue

        try:
            print(f"[{index}/{len(objects)}] {key}")
            s3_client.download_file(bucket, key, str(local_path))
            downloaded += 1
        except ClientError as exc:
            failed += 1
            print(f"  [FAILED] {key}: {exc}")

    return downloaded, skipped, failed


def summarize_folders(output_dir: Path, bucket: str) -> None:
    bucket_dir = output_dir / bucket
    if not bucket_dir.exists():
        return

    folders: dict[str, int] = {}
    for file_path in bucket_dir.rglob("*"):
        if file_path.is_file():
            relative = file_path.relative_to(bucket_dir)
            folder = str(relative.parent).replace("\\", "/")
            if folder == ".":
                folder = "root"
            folders[folder] = folders.get(folder, 0) + 1

    print(f"\nFolders in {bucket_dir}:")
    print("-" * 60)
    for folder, count in sorted(folders.items()):
        print(f"  {folder}: {count} file(s)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Download S3 bucket files folder-wise")
    parser.add_argument("--bucket", default=DEFAULT_BUCKET, help="S3 bucket name")
    parser.add_argument(
        "--output",
        default=str(DEFAULT_OUTPUT),
        help="Local output directory (bucket name is added as subfolder)",
    )
    parser.add_argument("--prefix", default="", help="Only download keys under this prefix")
    parser.add_argument(
        "--all-buckets",
        action="store_true",
        help="Download nowest + legacy jgi buckets",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Re-download files even if they already exist locally",
    )
    args = parser.parse_args()

    output_dir = Path(args.output).resolve()
    buckets = ALL_BUCKETS if args.all_buckets else [args.bucket]

    print("=" * 60)
    print("S3 Bucket Downloader")
    print("=" * 60)

    try:
        total_downloaded = 0
        total_skipped = 0
        total_failed = 0

        for bucket in buckets:
            downloaded, skipped, failed = download_bucket(
                bucket=bucket,
                output_dir=output_dir,
                prefix=args.prefix,
                skip_existing=not args.force,
            )
            total_downloaded += downloaded
            total_skipped += skipped
            total_failed += failed
            if downloaded or skipped:
                summarize_folders(output_dir, bucket)

        print("\n" + "=" * 60)
        print("DOWNLOAD COMPLETE")
        print("=" * 60)
        print(f"Downloaded: {total_downloaded}")
        print(f"Skipped:    {total_skipped}")
        print(f"Failed:     {total_failed}")
        print(f"Saved to:   {output_dir}")
        print("=" * 60)

        if total_failed:
            sys.exit(1)

    except NoCredentialsError:
        print("\n[ERROR] AWS credentials not found.")
        print("Run: aws configure")
        sys.exit(1)
    except ClientError as exc:
        print(f"\n[ERROR] {exc}")
        sys.exit(1)


if __name__ == "__main__":
    main()

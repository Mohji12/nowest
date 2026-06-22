#!/usr/bin/env bash
set -euo pipefail

# Deploy or update the Nowest API on an EC2 instance (Docker Compose).
# Usage:
#   cd /opt/nowest/app
#   chmod +x ec2/deploy.sh
#   ./ec2/deploy.sh

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

if [[ ! -f .env ]]; then
  echo "Missing .env file. Copy .env.example to .env and set DATABASE_URL, SECRET_KEY, etc."
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed. Install Docker first (see EC2_DEPLOYMENT.md)."
  exit 1
fi

echo "Building and starting Nowest API..."
docker compose -f docker-compose.ec2.yml pull nginx || true
docker compose -f docker-compose.ec2.yml build --pull
docker compose -f docker-compose.ec2.yml up -d

echo "Waiting for health check..."
for i in {1..20}; do
  if curl -fsS http://localhost/health >/dev/null 2>&1 || curl -fsS http://localhost:8000/health >/dev/null 2>&1; then
    echo "API is healthy."
    docker compose -f docker-compose.ec2.yml ps
    exit 0
  fi
  sleep 3
done

echo "API did not become healthy in time. Check logs:"
echo "  docker compose -f docker-compose.ec2.yml logs --tail=100"
exit 1

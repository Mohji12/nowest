#!/usr/bin/env bash
set -euo pipefail

# One-time EC2 host setup for Amazon Linux 2023 / Ubuntu.
# Run as a user with sudo access.

if command -v apt-get >/dev/null 2>&1; then
  sudo apt-get update
  sudo apt-get install -y git curl ca-certificates
  curl -fsSL https://get.docker.com | sudo sh
  sudo usermod -aG docker "$USER"
elif command -v dnf >/dev/null 2>&1; then
  sudo dnf update -y
  sudo dnf install -y git curl docker
  sudo systemctl enable --now docker
  sudo usermod -aG docker "$USER"
else
  echo "Unsupported OS. Install Docker manually."
  exit 1
fi

sudo mkdir -p /opt/nowest
sudo chown "$USER":"$USER" /opt/nowest

echo "Host setup complete."
echo "Log out and back in so docker group membership applies."
echo "Then clone the repo to /opt/nowest and run ec2/deploy.sh."

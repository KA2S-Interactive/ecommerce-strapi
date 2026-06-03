#!/usr/bin/env bash
# Installs Docker + Compose and PRE-PULLS the store images into the base
# snapshot. Booting a real store then becomes: drop docker-compose.yml + .env
# and `docker compose up -d` (seconds, not minutes).
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y ca-certificates curl gnupg nginx jq

# Docker engine + compose plugin (official repo)
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl enable --now docker

# Pre-pull images so first boot of a store is fast & deterministic.
docker pull "${STRAPI_IMAGE:-ghcr.io/khalildaibes/ecomstrapi:latest}"
docker pull n8nio/n8n:latest
docker pull postgres:16

mkdir -p /opt/store
echo 'Base image ready. Provision a store by placing docker-compose.yml + .env in /opt/store and running: docker compose up -d'

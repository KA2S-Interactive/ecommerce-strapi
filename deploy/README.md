# Deploy — prebaked, containerized store stack

This directory replaces the slow per-store cold build (apt + nvm + `npm ci` +
`strapi build` over SSH) with a **prebake-and-boot** model. It is the single
biggest lever for the “click → ~20 min → live” promise. See
`tailwind-landing-page-template/SCALING_AND_DELIVERY.md` for the rationale.

## The model
1. **CI builds the Strapi image** on every change
   (`.github/workflows/build-strapi-image.yml` → `ghcr.io/<owner>/ecomstrapi`).
2. **Packer bakes a base droplet snapshot** with Docker + the images pre-pulled
   (`packer/`). Do this once per image release, not per store.
3. **Provisioning a store** = create a droplet from that snapshot, drop a filled
   `.env` + `docker-compose.yml`, and run `docker compose up -d`. Because nothing
   compiles at provision time, the backend is up in **2–4 min**, predictably.

```
CI builds image  ->  Packer bakes snapshot  ->  per-store: boot snapshot + compose up
   (minutes,            (minutes, once            (seconds-minutes, every store)
    on push)             per release)
```

## Build the base snapshot
```bash
cd deploy/packer
export DIGITALOCEAN_TOKEN=...
packer init .
packer build -var "do_token=$DIGITALOCEAN_TOKEN" strapi.pkr.hcl
# -> snapshot "ecom-store-base-<timestamp>"; use its ID when creating droplets.
```

## Boot a store (on a droplet from the snapshot)
```bash
cd /opt/store
cp /path/to/docker-compose.yml .
cp .env.example .env   # then fill UNIQUE secrets (see below)
docker compose up -d
# Strapi :1337, n8n :5678, Postgres internal
```

## Stack
| Service | Image | Port | Notes |
|---|---|---|---|
| Strapi | `ghcr.io/<owner>/ecomstrapi` | 1337 | the CMS backend (this repo) |
| Postgres | `postgres:16` | internal | persistent volume `pgdata` |
| n8n | `n8nio/n8n` | 5678 | Telegram/AI automation; import workflows via API |

## Security (read this)
- **Generate unique secrets per store** (`.env`): DB password, `APP_KEYS`,
  JWT/admin secrets, n8n password. Never reuse a shared password across tenants.
- Pin a specific image tag in production (`...ecomstrapi:<sha>`), not `:latest`.
- Put Strapi + n8n behind Nginx/Caddy with HTTPS; set `N8N_SECURE_COOKIE=true`.
- Do **not** expose Postgres publicly. It is internal to the compose network here
  (unlike the legacy `ufw allow 5432` + `listen_addresses='*'` setup).

## Next step
Have the provisioning orchestrator (see `Ecom/control-plane`) create the droplet
from the snapshot, render `.env` with per-store secrets, `compose up`, then run
the n8n workflow import + Telegram bot wiring — instead of the legacy bash.

# Bakes a DigitalOcean snapshot with Docker + pre-pulled images so a new
# store droplet boots in minutes (no apt/npm at provision time).
#
# Usage:
#   export DIGITALOCEAN_TOKEN=...
#   packer init .
#   packer build -var "do_token=$DIGITALOCEAN_TOKEN" strapi.pkr.hcl

packer {
  required_plugins {
    digitalocean = {
      source  = "github.com/digitalocean/digitalocean"
      version = ">= 1.0.0"
    }
  }
}

variable "do_token" {
  type      = string
  sensitive = true
}

variable "strapi_image" {
  type    = string
  default = "ghcr.io/khalildaibes/ecomstrapi:latest"
}

variable "region" {
  type    = string
  default = "fra1"
}

source "digitalocean" "strapi" {
  api_token     = var.do_token
  image         = "ubuntu-22-04-x64"
  region        = var.region
  size          = "s-2vcpu-2gb"
  ssh_username  = "root"
  snapshot_name = "ecom-store-base-{{timestamp}}"
}

build {
  sources = ["source.digitalocean.strapi"]

  provisioner "file" {
    source      = "provision.sh"
    destination = "/tmp/provision.sh"
  }

  provisioner "shell" {
    inline = [
      "chmod +x /tmp/provision.sh",
      "STRAPI_IMAGE='${var.strapi_image}' bash /tmp/provision.sh",
    ]
  }
}

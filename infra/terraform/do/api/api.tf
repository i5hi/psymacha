variable "token"            {}
variable "region"           {}

provider "digitalocean"{
  token = var.token
}

variable "api_image"        {}
variable "api_admin"        {}
variable "api_ssh_key"      {}
variable "api_size"         {}
variable "api_label"        {}
variable "api_volume_id"    {}

resource "digitalocean_droplet" "swala-m" {
  name            = var.api_label
  region          = var.region
  size            = var.api_size
  image           = var.api_image
  ssh_keys        = [var.api_ssh_key]
}

resource "digitalocean_volume_attachment" "s5persistence" {
  droplet_id = digitalocean_droplet.swala-m.id
  volume_id  = var.api_volume_id
}

output "swala-m_ip" {
  value           = digitalocean_droplet.swala-m.ipv4_address
}


variable "cf_key"           {}
variable "cf_token"         {}
variable "cf_email"         {}
variable "cf_zone_id"       {}

provider "cloudflare" {
  version    = "~> 2.0"
  api_token  = var.cf_token
}

resource "cloudflare_record" "api" {
  type    = "A"
  name    = "api"
  zone_id = var.cf_zone_id
  value   = digitalocean_droplet.swala-m.ipv4_address
}


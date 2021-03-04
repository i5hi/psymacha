variable "token"            {}
variable "region"           {}

provider "digitalocean"{
  token = var.token
}

variable "vault_image"      {}
variable "vault_admin"      {}
variable "vault_ssh_key"    {}
variable "vault_size"       {}
variable "vault_label"      {}
variable "vault_volume_id"  {}

resource "digitalocean_droplet" "swala-v" {
  name            = var.vault_label
  region          = var.region
  size            = var.vault_size
  image           = var.vault_image
  ssh_keys        = [var.vault_ssh_key]
}

resource "digitalocean_volume_attachment" "s5secrets" {
  droplet_id = digitalocean_droplet.swala-v.id
  volume_id  = var.vault_volume_id
}

output "swala-v_ip" {
  value           = digitalocean_droplet.swala-v.ipv4_address
}

resource "digitalocean_firewall" "sats-fire" {
  name = "only-22-80-and-443"

  droplet_ids = [digitalocean_droplet.swala-m.id, digitalocean_droplet.swala-v.id]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol	     = "tcp"
    port_range       = 22909
    source_addresses = ["0.0.0.0/0", "::/0"]
  }
 
  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "icmp"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

variable "cf_key"           {}
variable "cf_token"         {}
variable "cf_email"         {}
variable "cf_zone_id"       {}

provider "cloudflare" {
  version    = "~> 2.0"
  api_token  = var.cf_token
}

resource "cloudflare_record" "vault" {
  type    = "A"
  name    = "vault"
  zone_id = var.cf_zone_id
  value   = digitalocean_droplet.swala-v.ipv4_address
}


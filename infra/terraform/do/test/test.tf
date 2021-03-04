variable "token"            {}
variable "region"           {}

provider "digitalocean"{
  token = var.token
}

variable "test_image"        {}
variable "test_admin"        {}
variable "test_ssh_key"      {}
variable "test_size"         {}
variable "test_label"        {}
variable "test_volume_id"    {}

resource "digitalocean_droplet" "swala-t" {
  name            = var.test_label
  region          = var.region
  size            = var.test_size
  image           = var.test_image
  ssh_keys        = [var.test_ssh_key]
}

resource "digitalocean_volume_attachment" "s5persistence-test" {
  droplet_id = digitalocean_droplet.swala-t.id
  volume_id  = var.test_volume_id
}

output "swala-t_ip" {
  value           = digitalocean_droplet.swala-t.ipv4_address
}


variable "cf_key"           {}
variable "cf_token"         {}
variable "cf_email"         {}
variable "cf_zone_id"       {}

provider "cloudflare" {
  email   = var.cf_email
  api_token  = var.cf_token
}

resource "cloudflare_record" "test" {
  type    = "A"
  name    = "test"
  zone_id = var.cf_zone_id
  value   = digitalocean_droplet.swala-t.ipv4_address
}

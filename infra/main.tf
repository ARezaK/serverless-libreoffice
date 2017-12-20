provider "aws" {
  region  = "us-east-1"
  version = "~> 1.2.0"
  profile = "vlad"
}

terraform {
  backend "s3" {
    acl     = "public-read"
    bucket  = "steamav"
    key     = "env-prod/libreoffice/main.tfstate"
    encrypt = "true"
    region  = "us-east-1"
    profile = "vlad"
  }
}

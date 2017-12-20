# Serverless LibreOffice

[![](https://cdn-images-1.medium.com/max/1600/1*4q_I8VM6Gtmtw6TAjORylA.png)](https://vladholubiev.com/serverless-libreoffice)

<p align="center">
  <a href="https://medium.com/@vladholubiev/how-to-run-libreoffice-in-aws-lambda-for-dirty-cheap-pdfs-at-scale-b2c6b3d069b4">
    👉🏻 Read the blog post on Medium: How to Run LibreOffice in AWS Lambda for Dirty-Cheap PDFs at Scale 👈🏻
  </a>
</p>

# Show Me the Code

This repo contains code used to run the [online demo](https://vladholubiev.com/serverless-libreoffice).


```
├── compile.sh  <-- commands used to compile LibreOffice for Lambda
├── infra       <-- terraform config to deploy example Lambda
│   ├── iam.tf
│   ├── lambda.tf
│   ├── main.tf
│   ├── s3.tf
│   └── vars.tf
└── src         <-- example Lambda function node in Node.js used for website demo
    ├── handler.js
    ├── libreoffice.js
    ├── logic.js
    ├── package.json <-- put lo.tar.gz in this folder to deploy. Download it below
    └── s3.js
```

Compiled and ready to use archive can be downloaded under [Releases section](https://github.com/vladgolubev/serverless-libreoffice/releases).

# How I got it working

Go on and create ~/.aws/credentials file and put your credentials in this format

[default]

aws_access_key_id = xxxx

aws_secret_access_key = xxxxx


Download terraform and put it in path

Run this in terminal

export TF_LOG="TRACE" &&
export TF_LOG_PATH=“Terraform_log.log" && 
export AWS_ACCESS_KEY_ID=“xxxx” && 
export AWS_SECRET_ACCESS_KEY=“xxxxx”

CD to folder that has all the .tf in it

$ terraform init

$ terraform plan # see whats gonna happen

$ terraform apply # run this whenever u change anything in terraform or if its first time

$ terraform show # see current state of terraform

$ terraform destroy # delete infrastructure

# sometimes the role isn’t made correctly so you get this error in log

Validate Response lambda/CreateFunction failed, not retrying, error InvalidParameterValueException: The provided execution role does not have permissions to call PutTraceSegments on XRAY

going to IAM management and while the function kept retrying i clicked attach policy and added “AWSXrayFullAccess”

after u do terraform apply

go to lambda -> functions -> prod_converttopdf add an s3 trigger that uses the SS bucket and has a  prefix media/attachments/ 

now when something gets uploaded to attachments folder -> lambda runs -> shows up in pdf bucket





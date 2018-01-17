#!/bin/bash

# generate private/public key
openssl genrsa -des3 -out site.key 2048

# create CSR  
openssl req -new -key site.key -out site.csr

# remove passphrase from the private key
mv site.key site.key.cc
openssl rsa -in site.key.cc -out site.key

# generate the self-signed certificate 
openssl x509 -req -days 365 -in site.csr -signkey site.key -out final.crt


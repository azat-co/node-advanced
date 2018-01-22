Generate Key and Cert:

```
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/C=US/ST=CA/L=SF/O=NO\x08A/OU=NA'\
  -keyout server.key -out server.crt
```

const fs = require('fs')
const crypto = require('crypto')
const zlib = require('zlib')
const SECRET = '3AABD889-25F9-4339-AAC2-3BE8EF02B047'

const r = fs.createReadStream('file.txt')
const e = crypto.createCipher('aes256', SECRET)
const z = zlib.createGzip()
const w = fs.createWriteStream('file.txt.gz')
r.pipe(e).pipe(z).pipe(w)

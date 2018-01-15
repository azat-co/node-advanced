const {Writable} = require('stream')
const translate = require('google-translate-api')

const translateWritableStream = new Writable({
  write(chunk, encoding, callback) {
    translate(chunk.toString(), {to: 'en'}).then(res => {
        console.log(res.text)
        //=> I speak English
        console.log(res.from.language.iso)
        //=> nl
        callback()
    }).catch(err => {
        console.error(err)
        callback()
    })
  }
})

process.stdin.pipe(translateWritableStream)
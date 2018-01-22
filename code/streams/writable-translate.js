const {Writable} = require('stream')
const translate = require('google-translate-api')
const translateWritableStream = new Writable({
  write(chunk, encoding, callback) {
    translate(chunk.toString(), {to: 'en'}).then(res => {
      console.log('Translated text in English:', res.text)
      console.log('Your language:', res.from.language.iso)
      callback()
    }).catch(err => {
      console.error(err)
      callback()
    })
  }
})

process.stdin.pipe(translateWritableStream)

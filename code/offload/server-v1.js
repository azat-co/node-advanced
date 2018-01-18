const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const hashPassword = (password, cb) => {
  const hash = bcrypt.hashSync(password, 16) // bcrypt has async but we are using sync here for the example
  cb(hash)
}
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('welcome to strong password site')
})

app.post('/signup', (req, res) => {
  hashPassword(req.body.password.toString(), (hash) => { // callback but sync
    // Store hash in your password DB.
    res.send('your credentials are stored securely')
  })
})

app.listen(3000)
const bcrypt = require('bcrypt')

process.on('message', (password) => {
  const hash = bcrypt.hashSync(password, 16)
  process.send(hash)
})
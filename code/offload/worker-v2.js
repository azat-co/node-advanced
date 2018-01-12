const bcrypt = require('bcrypt')
process.on('message', (password) => {
  const hash = bcrypt.hashSync(password, 15)
  process.send(hash)
})
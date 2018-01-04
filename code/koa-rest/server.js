const crypto = require('crypto')
const axios = require('axios')
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  const email = ctx.query.email
  console.log(email)
  if (!email) return false
  const hash = crypto.createHash('md5').update(email).digest("hex")
  const response = await axios.get(`https://gravatar.com/avatar/${hash}?size=150`, {
    responseType: 'arraybuffer',
    headers: {
      'Accept': 'image/jpeg',    
    }
  })
  ctx.set('Content-Disposition', `inline; filename =${email}_avatar.jpeg`)
  ctx.type='image/jpeg'
  ctx.body = response.data
})

if (require.main === module) {
  app.listen(3000)
} else {
  module.exports = app
}

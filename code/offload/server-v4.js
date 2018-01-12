const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const cluster = require('cluster')

if (cluster.isMaster) {
  const os = require('os')
  os.cpus().forEach(() => {
    const worker = cluster.fork()
    console.log(`Started worker ${worker.process.pid}`)
  })
  cluster.on('exit', (worker, code, signal) => {
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) { // &&!worker.exitedAfterDisconnect
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log('worker success!');
    }
    const newWorker = cluster.fork()
    console.log(`Worker ${worker.process.pid} exited.  
      Starting a new worker ${newWorker.process.pid}`)
  })
  return true
} 
// cluster.isWorker === true
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
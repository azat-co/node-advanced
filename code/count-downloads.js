const {spawn} = require('child_process')
const path = process.argv[2] || '$HOME/Downloads'
spawn(`cd ${path} && find . -type f | wc -l`, {
  stdio: 'inherit',
  shell: true
})

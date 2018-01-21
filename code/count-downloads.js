const {spawn} = require('child_process')
spawn('cd $HOME/Downloads && find . -type f | wc -l', {stdio: 'inherit', shell: true})

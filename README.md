footer: © NodeProgram.com, Node.University and Azat Mardan 2018
slidenumbers: true
theme: Simple, 1
build-lists: true

[.slidenumbers: false] 
[.hide-footer]

![fit](images/Node-Advanced-x2-1.png)

---

# Node Advanced
## Overview

![inline 100%](images/azat.jpeg)
Azat Mardan @azat_co

![inline right](images/nu.png)

---

# Node Advanced

![](images/Node-Advanced-x2-1.png)

* Videos: <http://node.university/p/node-advanced>
* Slides: in `*.md` in <https://github.com/azat-co/node-advanced>
* Code: in `code` in <https://github.com/azat-co/node-advanced>

---

# Table of Contents

--

## Course Overview

* Table of Contents
* What to expect
* What you need

---

## Module 1: Modules

* How `module.exports` and `require()` actually work
* npm tricks (scripts) and npm scripts 

---

## Module 2: Node Event Loop and Async Programming

* Event look
* Call stack
* setTimeout, process.nextTick
* Error-first callback
* Event Emitters
* Promises vs events
* Async/await

---

## Module 3: Streaming

* reading
* writing
* duplex
* transform

---

## Module 4: Debugging

* Debugging 
* CPU profiling
* Networking Debugging with DevTools

---

## Module 5: Scaling

* cluster
* Load testing
* Messaging
* spawn, fork, exec
* Offloading CPU-intensive tasks

---

## Outro

* Summary

---


# What to expect

* Pure Node
* Core Node
* ES Next

---

# What not to expect

* No npm modules
* No JavaScript
* No frameworks

---

# Prerequisites

* Node Foundation
* You Don't Know Node
* Node Patterns

---


# What you need

* Node version 8+
* npm version 5+
* Chrome
* Slides&code: <https://github.com/azat-co/node-advanced>

---

## Module 2: Modules

* How `module.exports` and `require()` actually work
* npm tricks (scripts) and npm scripts 

---

# `require()`

1. Resolving
1. Loading
1. Wrapping
1. Evaluating
1. Caching

---

module-1.js:

```js
console.log(module) // console.log(global.module)
```

---

```js
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/Users/azat/Documents/Code/node-advanced/code/module-1.js',
  loaded: false,
  children: [],
  paths:
   [ '/Users/azat/Documents/Code/node-advanced/code/node_modules',
     '/Users/azat/Documents/Code/node-advanced/node_modules',
     '/Users/azat/Documents/Code/node_modules',
     '/Users/azat/Documents/node_modules',
     '/Users/azat/node_modules',
     '/Users/node_modules',
     '/node_modules' ] }
```

---

* local takes precedence 
* module can be a file or a folder with index.js (or any file specified in package.json main in that nested folder)
* loaded is true when this file is imported/required by another
* id is the path when this file is required by another
* parent and children will be populated accordingly

require.resolve() - check if the package exists/installed or not but does not execute

1. try name.js
1. try name.json
1. try name.node (compiled addon example)
1. try name folder

---

`require.extensions`

{ '.js': [Function], '.json': [Function], '.node': [Function] }

---

# Exporting




---

All the same: 

```js
global.module.exports.parse = () => {} 
module.exports.parse = () => {} 
exports.parse = () => {} 
```

---

```js
exports.parse = ()=>{} // ok
exports = {parse: ()=>{} } // not ok
module.exports = {parse: ()=>{} } // ok again 
```

---

Function wrapping keeps local vars local

`require('module').wrapper`

exports and require are specific to each module, not true global global, same with `__filename` and `__dirname`

console.log(arguments)

---

```js
module.exports = {
  parse: () => {}
}
```


```js
const Parser = {
  parse() {

  }
}
module.exports = Parser
```

---


```js
module.exports = () => { // not the same as object {}
  return {
    parse: () => {}
  }
}
```

---

`import` and `import()`

---

# Caching

`require.cache`

---

# Global

```js
var limit = 1000 // local, not available outside
const height = 50 // local
let i = 10 // local
console = () => {} // global, overwrites console outside
global.Parser = {} // global
max = 999 // global too
```

---

# npm

* registry
* cli: folders, git, private registries (self hosted npm, Nexus, Artifactory)

* yarn
* pnpm

---

# npm Git

```
npm i expressjs/express -E
npm ls express
```

```
npm i expressjs/express#4.14.0 -E
```

---

```
npm i --dry-run express
npm ls -g --depth=0
npm ll -g --depth=0
npm ls -g --depth=0 --json
```

npm installs in ~/node_modules (if no local)

---

```
npm init -y
```

---

```
 npm config ls
```

```
init-author-name = "Azat Mardan"
init-author-url = "http://azat.co/"
init-license = "MIT"
init-version = "1.0.1"
```

---

## Setting up npm registry

```
npm config set registry "http://registry.npmjs.org/"
```

---

## Setting up npm proxy

```
npm config set https-proxy http://proxy.company.com:8080
npm config set proxy http://proxy_host:port
```

Note: The https-proxy doesn't have https as the protocol, but http.

---

-S (default in v5)
-D
-O
-E

---

`npm update` and `npm outdated`

`<` and `<=`
`=`
`.x`
`~`
`^`
`>` and `>=`

---

```
npm home express
npm repo express
npm docs express
```


```
npm link 
npm unlink
```

---

# Module 3: Node Event Loop and Async Programming

--

## Event loop

---

## Input and Output

Input/Output Messages are most "expensive" (slow)

* Disk
* Networking

---

## Dealing with Slow I/O

* Synchronous
* Forking
* Threading 
* Event loop

---

![](https://www.youtube.com/watch?v=PNa9OMajw9w)

<https://www.youtube.com/watch?v=PNa9OMajw9w>

---

## Call stack

push, pop functions
FILO/LIFO/LCFS - functions removed from top (opposite of queue)

^https://techterms.com/definition/filo

---

```js
const f3 = () => {
  console.log('executing f3')
  undefinedVariableError
}
const f2 = () => {
  console.log('executing f2')
  f3()
}
const f1 = () => {
  console.log('executing f1')
  f2()
}

f1()
```

---

push to call stack

```
f3() // last
f2()
f1()
anonymous() // first
```

---

```
> f1()
executing f1
executing f2
executing f3
ReferenceError: undefinedVariableError is not defined
    at f3 (repl:3:1)
    at f2 (repl:3:1)
    at f1 (repl:3:1)
    at repl:1:1
    at ContextifyScript.Script.runInThisContext (vm.js:23:33)
    at REPLServer.defaultEval (repl.js:339:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.onLine (repl.js:536:10)
    at emitOne (events.js:101:20)
```


---


## Event Queue

FIFO to push to call stack

---

```js
const f3 = () => {
  console.log('executing f3')
  setTimeout(()=>{
    undefinedVariableError
  }, 100)
}
const f2 = () => {
  console.log('executing f2')
  f3()
}
const f1 = () => {
  console.log('executing f1')
  f2()
}

f1()
```

---

Different call stack. No f1, f2, f3 for the setTimeout callback (comes from event queue)

```
> f1()
executing f1
executing f2
executing f3
undefined
> ReferenceError: undefinedVariableError is not defined
    at Timeout.setTimeout [as _onTimeout] (repl:4:1)
    at ontimeout (timers.js:386:14)
    at tryOnTimeout (timers.js:250:5)
    at Timer.listOnTimeout (timers.js:214:5)
>
```

---

## setTimeout vs. setImmediate vs. process.nextTick


`setImmediate()` similar to setTimeout with 0 but timing is different sometimes, it is recommended when you need to execute on the next cycle
`process.nextTick` - making functions fully async (same cycle)

---

1. timers
1. I/O callbacks
1. idle, prepare
1. poll (incoming connections, data)
1. check
1. close callbacks

^https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

---

## Error-first callback

define:

```js
const myFn = (cb) => {
  // define error and data
  // do something...
  cb(error, data)
}
```

---

Use: 

```js
myFn((error, data)=>{
  
})
```

---

Argument names don't matter (order does):

```js
myFn((err, result)=>{
  
})
```

---

Callbacks not always async

```js
arr.map((item, index, list)=>{
  
})
```

---

Errors first but the callback last

(Popular convention but not enforced by Node)

---

## Promises

* Consume from a module (axios, koa, etc.)
* Create your own using ES6 Promise or a library ([bluebird]() or [q](https://documentup.com/kriskowal/q/))


---

## Usage and consumption of ready promises

---

# Callbacks Syntax 

```js
asyncFn1((error1, data1) => {
  asyncFn2(data1, (error2, data2) => {
    asyncFn3(data2, (error3, data3) => {
      asyncFn4(data3, (error4, data4) => {
        // Do something with data4
      })
    })
  })
})
```

---

## Promise Syntax Style

```js
promise1(data1)
  .then(promise2)
  .then(promise3)
  .then(promise4)
  .then(data4=>{
    // Do something with data4
  })
  .catch(error=>{
    // handle error1, 2, 3 and 4
  })
```

(separation of data and control flow arguments)

---

## Axios Example

```js
const axios = require('axios')
axios.get('http://azat.co')
  .then((response)=>response.data)
  .then(html => console.log(html))
```  

---

```js
const axios = require('axios')
axios.get('https://azat.co')
  .then((response)=>response.data)
  .then(html => console.log(html))
  .catch(e=>console.error(e))
```


```
Error: Hostname/IP doesn't match certificate's altnames: "Host: azat.co. is not in the cert's altnames: DNS:*.github.com, DNS:github.com, DNS:*.github.io, DNS:github.io"
```


---

## Naive Promise: Callback Async Function

```js
function myAsyncTimeoutFn(data, callback) {
  setTimeout(() => {
    callback()
  }, 1000)
}

myAsyncTimeoutFn('just a silly string argument', () => {
  console.log('Final callback is here')
})
```

---

## Naive Promise: Implementation

```js
function myAsyncTimeoutFn(data) {

  let _callback = null
  setTimeout( () => {
    if ( _callback ) callback()
  }, 1000)
  
  return {
    then(cb){
      _callback = cb
    }
  }

}

myAsyncTimeoutFn('just a silly string argument').then(() => {
  console.log('Final callback is here')
})
```

---

## Naive Promise: Implementation with Errors

```js
const fs = require('fs')
function readFilePromise( filename ) {
  let _callback = () => {}
  let _errorCallback = () => {}

  fs.readFile(filename, (error, buffer) => {
    if (error) _errorCallback(error)
    else _callback(buffer)
  })

  return {
    then( cb, errCb ){
      _callback = cb
      _errorCallback = errCb
    }
  }

}
```

---

## Naive Promise: Reading File

```js
readFilePromise('package.json').then( buffer => {
  console.log( buffer.toString() )
  process.exit(0)
}, err => {
  console.error( err )
  process.exit(1)
})
```

---

## Naive Promise: Triggering Error

```js
readFilePromise('package.jsan').then( buffer => {
  console.log( buffer.toString() )
  process.exit(0)
}, err => {
  console.error( err )
  process.exit(1)
})
```

```
{ Error: ENOENT: no such file or directory, open 'package.jsan'
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'package.jsan' }
```

---

## ES6/ES2015 Promise

```
Promise === global.Promise
```

(Node version 8+)

`Promise` take callback with `resolve` and `reject`

---

## Simple Proper Promise Implementation (from ES6/ES2015)

```js
const fs = require('fs')
function readJSON(filename, enc='utf8'){
  return new Promise(function (resolve, reject){
    fs.readFile(filename, enc, function (err, res){
      if (err) reject(err)
      else {
        try {
          resolve(JSON.parse(res))
        } catch (ex) {
          reject(ex)
        }
      }
    })
  })
}

readJSON('./package.json').then(console.log)
```

---

## Advanced Proper Promise Implementation (from ES6/ES2015) for both promises and callbacks

```js
const fs = require('fs')

const readFileIntoArray = function(file, cb = null) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) {
        if (cb) return cb(error) 
        return reject(error)
      }

      const lines = data.toString().trim().split('\n')
      if (cb) return cb(null, lines)
      else return resolve(lines)
    })
  })
}
```

---

## Example call

```js
const printLines = (lines) => {
  console.log(`there are ${lines.length} line(s)`)
  console.log(lines)
}
const FILE_NAME = __filename

readFileIntoArray(FILE_NAME)
  .then(printLines)
  .catch(console.error)

readFileIntoArray(FILE_NAME, (error, lines) => {
  if (error) return console.error(error)
  printLines(lines)
})
```

---

## Event Emitters

1. Import `require('events')`
1. Extend `class Name extends ...`
1. Instantiate `new Name()`
1. Add listeners `.on()`
1. Emit `.emit()`


---

## Promises vs events

* Events are sync
* React to same event from multiple places 
* React to same event multiple times

---

Events are about building extensible functionality and making modular code flexible

* `.emit()` can be in the module and `.on()` in the main program which consumes the module
* `.on()` can be in the module and `.emit()` in the main program
* pass data with `emit()`
* `error` is a special event (if listen to it then no crashes)

---

* `on()` execution happen in the order in which they are defined (`prependListener` or `removeListener`)

---

* Default maximum listeners is 10 (to find memory leaks), `setMaxListeners` ([source](https://github.com/nodejs/node/blob/master/lib/events.js#L81))

```js
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n)) {
    const errors = lazyErrors();
    throw new errors.RangeError('ERR_OUT_OF_RANGE', 'n',
                                'a non-negative number', n);
  }
  this._maxListeners = n;
  return this;
};
```

---

class 

```js
process.nextTick(()=>{
  this.emit()
})
```

---

## Async/await

---

```js
const axios = require('axios')
const getAzatsWebsite = async () => {
  const response = await axios.get('http://azat.co')
  return response.data
}
getAzatsWebsite().then(console.log)
```

---

## Util.promisify

```js
const util = require('util')
const f = async function() {
  try {
    await util.promisify(setTimeout)(()=>{consoleg.log('here')}, 1000)
  } catch(e) {
    await Promise.reject(new Error('test'))
  }
}

f()
```

---

```js
const axios = require('axios')
const {expect} = require('chai')
const app = require('../server.js')
const port = 3004

before(async function() {
  await app.listen(port, ()=>{console.log('server is running')})
  console.log('code after the server is running')
})

describe('express rest api server', async () => {
  let id

  it('posts an object', async () => {
    const {data: body} = await axios.post(`http://localhost:${port}/collections/test`, { name: 'John', email: 'john@rpjs.co'})
    expect(body.length).to.eql(1)
    expect(body[0]._id.length).to.eql(24)
    id = body[0]._id
  })

  it('retrieves an object', async () => {
    const {data: body} = await axios.get(`http://localhost:${port}/collections/test/${id}`)
    // console.log(body)
    expect(typeof body).to.eql('object')
    expect(body._id.length).to.eql(24)
    expect(body._id).to.eql(id)
    expect(body.name).to.eql('John')
  })
  // ...
})
```

---

## Project: Koa Server with Mocha (async/await)

---

# Module 4: Streaming

* reading
* writing
* duplex
* transform

---

## Module 5: Debugging

* Debugging 
* CPU profiling
* Networking Debugging with DevTools

---

## Module 6: Scaling

* cluster
* Load testing
* Messaging
* spawn, fork, exec
* Offloading CPU-intensive tasks

---

## Outro

* Summary

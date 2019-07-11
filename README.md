# dproxy.js
dynamic proxy  incubated from pplugins.js

## how to use 
```bash
# install
npm i --save dproxy.js
```

```js
var dproxy = require('dproxy.js')

var origin = require('xx/origin.js')
var proxy = require('xx/proxy.js')

dproxy.setProxy(origin,proxy,function(){ console.log("proxy finished")})

origin.yourMethod()

origin.abc

```

more in test/test.js
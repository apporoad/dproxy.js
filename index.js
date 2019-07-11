const util = require('./util')

var debugAndThrow = err =>{
    console.error(err)
    throw new Error(err)
}

var checkProxy = (origin,proxy,verbose) =>{
    //todo
}

exports.setProxy =(origin, proxy ,completeFn) =>{
    //
    if(origin.iproxy){
        console.log("accc")
        origin.iproxy = proxy
        return
    }
    //override proxy
    origin.iproxy = proxy
    //check proxy match origin
    checkProxy(origin,proxy,true)

    if(util.Type.isObject(origin) || util.Type.isFunction(origin)){
        // console.log('aaaaaaaaaaaa')
        for(var key in origin){
            //ignore iproxy
            if(key == "iproxy")
            {
                continue
            }
            var val = origin[key]
            if(util.Type.isFunction(val)){
                //console.log("aaaaaaaaaaaaaaaaaa:" +key)
                //set function proxy
                //closure
                var generate = ()=>{
                    var keepKey = key
                    //console.log(key)
                    return  ((...params)=>{ 
                        //console.log("CCCCCCCCCCCCCC:" + keepKey)
                        //if has proxy
                        if(origin.iproxy){
                            if(!origin.iproxy[keepKey]){
                                debugAndThrow("proxy: your proxy method undefined :" + keepKey )
                            }
                            if(!util.Type.isFunction(origin.iproxy[keepKey])){
                                //console.trace()
                                debugAndThrow("proxy: your proxy."+ keepKey+" must be a function ")
                            }
                            //console.log(arguments)
                            //console.log(params)
                            return origin.iproxy[keepKey].apply(origin.iproxy,params)
                        }else{
                            //console.log(origin)
                            debugAndThrow("proxy: your iproxy have be removed ,please check your code : " + keepKey)
                        }
                        //console.log('here proxy method :' + key)
                    })
                }

                origin[key] = generate()
            } else{
                //console.log("bbbbbbbbbbbbbbb:" + key)
                // ison[key] = "proxy val :" + val
            
                //closure
                var gGet = ()=>{
                    var keepKey = key
                    return  function() {
                        if(origin.iproxy){
                            if(util.Type.isFunction(origin.iproxy[keepKey])){
                                //console.log(origin.iproxy[keepKey])
                                return origin.iproxy[keepKey]()
                            }
                            return origin.iproxy[keepKey]
                        }
                        debugAndThrow("proxy: your iproxy have be removed ,please check your code : " + keepKey)
                    }
                }
                var gSet = ()=>{
                    var keepKey = key
                    return function(value) {
                        if(origini.iproxy){
                            if(util.Type.isFunction(origin.iproxy[keepKey])){
                                origin.iproxy[keepKey](value)
                            }else{
                                origin.iproxy[keepKey] = value
                            }
                            
                        }
                        debugAndThrow("proxy: your iproxy have be removed ,please check your code : " + keepKey)
                    }
                }

                // todo get set 
                Object.defineProperty(origin, key, {
                    get: gGet(),
                    set: gSet()
                })
            }
        }
    }
    else{
        console.error("ppulgins:engine: only Object or Function can setProxy :" + origin)
    }

    if(completeFn){
        completeFn(origin,proxy)
    }
    //console.log(origin)
    //console.log(origin.iproxy)
}

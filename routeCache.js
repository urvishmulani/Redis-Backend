import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 900 })

export const test =duration=>(req,res,next)=>{
    if(req.method !== 'GET'){
        console.error("Cannot cache non-GET methods!");
        return next;
    }

    const key= req.originalUrl;
    const cachedResponse=cache.get(key);
   // console.log(key)
    if(cachedResponse){
        console.log("Cache hit for "+key);
       // res.send("cachedResponse");
       return res.json("user has been deleted")
    }
    else
        console.log("Cache missed!")
        res.originalSend=res.send;
        res.send=body=>{
           res.originalSend(body)
            cache.set(key,body,duration);
            
        }
        next();

}


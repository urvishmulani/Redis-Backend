import {createClient} from 'redis'

const RedisCon=createClient()

RedisCon.on('error', err => console.log('Redis Client Error', err));

RedisCon.connect();

RedisCon.on("connect",function(success){
  console.log("redis connected")
})

export default RedisCon
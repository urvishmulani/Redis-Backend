import express from "express";
import cors from "cors"
import multer from "multer";

import assignroutes1 from "./Models/r_students.js"
import assignroutes2 from "./Models/r_teachers.js"
import assignroutes3 from "./Models/r_Login.js"
//import path from "path";

import {createClient} from 'redis'

const client=createClient()

client.on('error', err => console.log('Redis Client Error', err));

client.connect();

client.on("connect",function(success){
  console.log("redis connected")
})

const app= express()
app.use(express.json())
app.use(cors())

app.use("/backend/students",assignroutes1)
app.use("/backend/teachers",assignroutes2)
app.use("/backend/login",assignroutes3)

app.listen(8000,()=>{
    console.log("Connected to Backend")
})


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/backend/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.get("/backend/home", async function(req,res){
  let parentKey="Demo"
  let keyName="normalKey2";
  let getCacheData= await client.hGet(parentKey,keyName)
  let result={id:1,name:'urvish'}
  let responseArray=""
  let getAllCache= await client.hGetAll(parentKey)
  console.log(getAllCache)
  if(getCacheData)
  {
    responseArray=getCacheData;
    console.log("get cache")
    console.log(responseArray)

    
  }else{
    console.log("set cache")
    await client.hSet(parentKey,keyName, JSON.stringify(result))
    
  }
  //client.del(keyName)
  return res.json(responseArray)
})
import { db } from "../db.js";
import NodeCache from 'node-cache'
import fetch from 'node-fetch'
const cache = new NodeCache({ stdTTL: 900 })
import axios from "axios";
import {createClient} from 'redis'

const client=createClient()

client.on('error', err => console.log('Redis Client Error', err));

client.connect();

client.on("connect",function(success){
  console.log("redis connected")
})

export const getStudents = async(req, res) => {
    let parentKey="Demo"
    let keyName="getstudents";
    let getCacheData= await client.hGet(parentKey,keyName)
  
    let responseArray=""

    if(getCacheData)
    {
        responseArray=getCacheData;
        console.log("get cache")
        console.log(responseArray)
        //client.del(parentKey)
        return res.json(responseArray)
        
    }else{
        console.log("set cache")
        const {data}= await axios.get('https://www.thunderclient.com/welcome');
        client.hSet(parentKey,keyName, JSON.stringify(data),{Ex:30})
        return res.json(data)
        // const query1="SELECT * FROM mst_students";
        // db.query(query1,(err,data)=>{
        //     if(err){
        //         return res.json(err)
        //     } 
        //     else{
        //         client.hSet(parentKey,keyName, JSON.stringify(data),{Ex:30})
        //         return res.json(data)
        //     }        
        // })
    }
}
export const getStudents2 = (req, res) => {
    const key= req.originalUrl;
    const cachedResponse=cache.get(key);
 //   const query="SELECT *,DATE_FORMAT(dob,'%Y-%m-%d')AS dob2 FROM mst_students";
    if(cachedResponse){
        console.log("Cache hit for "+key);
    // res.send("cachedResponse");
        return res.json(cachedResponse)
    }
    else
    {
        console.log("Cache missed!")
        const query1="SELECT * FROM mst_students";
        db.query(query1,(err,data)=>{
            if(err){
                return res.json(err)
            } 
            else{
               
                    cache.set(key,data,900);
                    
                
                return res.json(data)
            }        
        })
    }
}

export const externalAPI = async(req, res) => {
    // const url="https://www.thunderclient.com/welcome"
    // const data= await fetch(url).then((res)=>{
    //     res.json().then((res1)=>{
    //         console.log(res1)
    //     })
    // })
    // return res.json(data)
   //let data='';
   const {data}= await axios.get('https://www.thunderclient.com/welcome');
    
  return res.json(data)
}
export const getStudent = (req, res) => {
    const query="select * from mst_students where student_id=?"
 //   const query="SELECT *,DATE_FORMAT(dob,'%Y-%m-%d')AS dob2 FROM mst_students WHERE student_id = ?"
    //const student_id = req.params.id;  
   
    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err)        
        return res.json(data[0])
    })
}

export const deleteStudent=(req,res)=>{
   // const student_id=req.params.id;  
   
    const query="DELETE FROM mst_students where student_id= ?"
    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err)
        return res.json("user has been deleted")
    })
}

export const insertStudents=(req,res)=>{
    
    const query="INSERT INTO mst_students(`student_name`, `email`, `mobile`) values(?)";
    const values= [
        req.body.student_name,
        req.body.email,
        req.body.mobile
    ];
console.log(query)
console.log(values)
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("New Student has been added")
    })
}
export const updateStudent=(req,res)=>{
   // const student_id=req.params.id;    
  //  console.log(student_id)
    const query="UPDATE `mst_students` SET `student_name`=?,`email`=?,`mobile`=? where student_id=?"
    const values= [        
        req.body.student_name,
        req.body.email,
        req.body.mobile
    ];
    
    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Student data has been updated")
    })
}


import { json } from "express";
import { db } from "../db.js";

export const getStudent = (req, res) => {
    
 //   const query="SELECT *,DATE_FORMAT(dob,'%Y-%m-%d')AS dob2 FROM mst_students WHERE student_id = ?"
    //const student_id = req.params.id;  
    const mobile = req.query.mobile;
    const pwd = req.query.pwd;
    const query="SELECT student_id FROM `mst_students` WHERE mobile='"+mobile+"' AND pwd='"+pwd+"'"
    
   //console.log(query)
   
   try {
        db.query(query,(err,data)=>{        
             //console.log(data.length)    
          //   console.log(data[0].student_id)
             if(err) return res.json(err)
             else
             {
                if(data.length==0)
                    return res.json(0)
                else
                    return res.json(data[0].student_id)
             }
             
            //   if(err) return res.json(err)        
            //   return res.json(data[0].student_id)
         })        
    } catch (error) {
        return res.json(0)
    }
    
}
import { db } from "../db.js"

export const getTeachers = (req, res) => {
    console.log("function called")
    const query="SELECT * FROM mst_teachers"
    console.log(req.query.teacher_id)
    console.log(req.query.mobile)
   // const { teacher_id, mobile } = req.body
    
    // const values = {
    //     teacher_id: teacher_id,
    //     mobile: mobile
    // };

    //  console.log(teacher_id)
    //  console.log(mobile)

    db.query(query,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

export const getTeacher = (req, res) => {
   
    const query="SELECT * FROM mst_teachers where teacher_id=? and mobile=?"
    const { teacher_id, mobile } = req.body
    
    const values = {
        teacher_id: teacher_id,
        mobile: mobile
    };
  
    console.log(teacher_id)
    console.log(mobile)

     db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data[0])
    })
}
export const deleteTeacher=(req,res)=>{
    
   
    const query="DELETE FROM mst_teachers where teacher_id= ?"
    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Teacher has been deleted")
    })
}
export const updateTeacher=(req,res)=>{    
    const query="UPDATE `mst_teachers` SET `teacher_name`=?,`mobile`=?,`email`=? where teacher_id=?"
    const values= [        
        req.body.teacher_name,
        req.body.mobile,
        req.body.email
    ];
    
    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Teacher data has been updated")
    })
}
export const insertTeacher=(req,res)=>{
    const query="INSERT INTO mst_teachers(`teacher_name`, `mobile`, `email`, `image`, `image2`, `image3`, `image4`) values(?)";
    const values= [
        req.body.teacher_name,
        req.body.mobile,
        req.body.email,
        req.body.image,
        req.body.image2,
        req.body.image3,
        req.body.image4
    ];

    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("New Teacher has been added")
    })
}
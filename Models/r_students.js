import express from "express";

import {
  deleteStudent,getStudent,insertStudents,updateStudent,externalAPI,getStudents
} from '../Controllers/students.js'

//import {test} from '../routeCache.js'

const router = express.Router();
//const cache=test;

router.get("/",getStudents);
//router.get("/",ExternalAPI);
router.get("/:id", getStudent);
router.post("/", insertStudents);
router.delete("/:id", deleteStudent);
router.put("/:id", updateStudent);

export default router;
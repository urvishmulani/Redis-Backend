import express from "express";
import {deleteTeacher,getTeacher,getTeachers,insertTeacher,updateTeacher} from '../Controllers/teachers.js'

const router = express.Router();

router.get("/:id", getTeacher);
router.post("/",insertTeacher);
router.delete("/:id", deleteTeacher);
router.get("/", getTeachers);
router.put("/:id", updateTeacher);

export default router;
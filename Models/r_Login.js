import express from "express";

import {
    getStudent
} from '../Controllers/Login.js'

const router = express.Router();
router.get("/", getStudent);
export default router;
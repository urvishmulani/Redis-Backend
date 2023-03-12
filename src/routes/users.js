//import {addUser,deleteUser,editUser,getUserById,getUsers} from '../controllers/users.js'

const contorllers = require('../controllers/users')
//import  express  from 'express'
const express = require('express')

const router = express.Router();

router.get('/', contorllers.getUsers);
router.post('/', contorllers.addUser);
router.get('/:id', contorllers.getUserById);
router.put('/:id', contorllers.editUser);
router.delete('/:id', contorllers.deleteUser);

module.exports = router;

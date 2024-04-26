import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import {create }  from   '../controllers/post.controller.js'



const router=express.Router();

router.post('/create', verifyToken, create); //we are calling a function create which is in post.controller.js file.


export default router;

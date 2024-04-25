import express from 'express';
import {test, updateUser, deleteUser} from "../controllers/user.controller.js";
import { verifyToken } from '../utils/verifyUser.js';

const router=express.Router();

router.get('/test', test); 
router.put('/update/:userId', verifyToken, updateUser); //Put for updation, 
router.delete('/delete/:userId', verifyToken, deleteUser);   //Here deleteUser is a function that we have defined in user.controller.js file

export default router;
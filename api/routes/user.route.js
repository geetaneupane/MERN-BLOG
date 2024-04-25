import express from 'express';
import {test, updateUser, deleteUser, signout} from "../controllers/user.controller.js";
import { verifyToken } from '../utils/verifyUser.js';

const router=express.Router();

router.get('/test', test); 
router.put('/update/:userId', verifyToken, updateUser); //Put for updation, 
router.delete('/delete/:userId', verifyToken, deleteUser);   //Here deleteUser is a function that we have defined in user.controller.js file
router.post('/signout', signout); //Anyone can signout, so we dont need to verifytoken.

export default router;
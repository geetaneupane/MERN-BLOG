import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup=async (req,res, next)=>{
    const {username, password, email}= req.body;

    if(!username || !email || !password || username==='' || email==='' ||password===''){
     next(errorHandler(400, "All fields are required!!"));
    }
    
    const hashedPassword=bcryptjs.hashSync(password, 10);     //here 10 is number of salts i.e. salts mean random value. 

    const newUser=new User({
        username,
        email,
        password: hashedPassword,
    });

    try{
    await newUser.save();
    res.json({message: "Signup successful!"});
    }
    catch(error){
       next(error);
    }
}

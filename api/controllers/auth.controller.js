import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';



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







export const signin=async (req,res, next)=>{
    const {email, password}= req.body;
    if( !email || !password ||  email==='' ||password===''){
        next(errorHandler(400, "All fields are required!!"));
       }
       try{
        const validUser=await User.findOne({email});
            if(!validUser){
               return  next(errorHandler(404, "User not found!"));
            }
            const validPassword=bcryptjs.compareSync(password, validUser.password);           //This is a feature of bcrypt.js that compares the password entered by the user to the hashedpassword that the user had provided while signing up for the first time. 
            if(!validPassword){
                 return next(errorHandler(404, "Invalid password!"));
            }
            const token=jwt.sign({id:validUser._id } , process.env.JWT_KEY);  
                const {password:pass, ...rest}=validUser._doc;                                                      //We are getting the objectId from mongobd database in the form of _id Look at the database. 
            res.status(200)
            .cookie('access token', token, {
           httpOnly:true }).json(rest);              //this rest is referring to validUser, validPassword and other after validation.
       }
       catch(error){
        next(error);
       }
}



//There is also a unique key called as a secret key which is only for you. I have assigned this key value in .env file. 


export const google=async(req, res, next)=>{
    const { email, name, googlePhotoUrl } = req.body;
    try{
       const user=await User.findOne({email});
       if(user){
        const token=jwt.sign({id:user._id}, process.env.JWT_KEY);
        const {password, ...rest}=user._doc;
        res.status(200).cookie('access token', token, {
            httpOnly:true }).json(rest);        
       } const generatedPassword =
       Math.random().toString(36).slice(-8) +
       Math.random().toString(36).slice(-8);
     const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
     const newUser = new User({
       username:
         name.toLowerCase().split(' ').join('') +
         Math.random().toString(9).slice(-4),
       email,
       password: hashedPassword,
       profilePicture: googlePhotoUrl,
     });
     await newUser.save();
     const token=jwt.sign({id:newUser._id } , process.env.JWT_KEY);  
     const { password, ...rest } = newUser._doc;
     res
       .status(200)
       .cookie('access_token', token, {
         httpOnly: true,
       })
       .json(rest);
   }  
    catch(error){
        console.log(error);
    }
}
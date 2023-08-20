
const userSchema = require("../models/user.models")
require("dotenv").config()
 const jwt = require('jsonwebtoken');

 

// process.env.secrete_key
  const genearteTocken = (newuser)=>{
    return jwt.sign({  newuser }, "masaisecret"  );
  }

const register = async (req, res)=>{
   
      try{     
           const user = await userSchema.findOne({ email : req.body.email });
           if(user){
            return res.status(200).json( {message : "useralready registered", userStatusForWrong : true } )
           }
            const newuser = await userSchema.create(req.body);  
            
            const tocken =  genearteTocken(newuser);
            
            return res.status(200).json({newuser, tocken, userStatusForWrong : false });

      }catch(err){
          return res.status(400).json(err);
      }
}


const login = async (req, res)=>{
     try{
       const user = await userSchema.findOne({ email : req.body.email });
           if(!user){
            return res.status(200).json( {message : "invalid email or password", userStatusForWrong : true  } )
           }

           const match = user.checkPassword(req.body.password);

            if(!match){
               return res.status(200).send({message : "wrong  email or password", userStatusForWrong : true});
            }
             console.log("match", match, user);

             let tocken = genearteTocken(user)
           return res.status(200).json({user, tocken, userStatusForWrong : false });

     }catch(err){
        return res.status(400).json({err : err});
     }
}

module.exports = {register, login, genearteTocken};
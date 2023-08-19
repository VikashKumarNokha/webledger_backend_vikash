
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const passport = require("passport");

const User = require("../models/user.models")

const { v4: uuidv4 } = require('uuid')

  require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {

     let user = await User.findOne({email : profile?._json?.email}).lean().exec() 
     
     // console.log("uuuuuuuu", profile?._json?.name?.split(" ")?.[0], profile?._json?.name?.split(" ")?.[1] ); 
       

       if(!user){
         user = await User.create({
            firstname : profile?._json?.name?.split(" ")?.[0],
            lastname : profile?._json?.name?.split(" ")?.[1],
            email : profile?._json?.email ,
            password :  uuidv4,
         })
       }
     
       console.log(accessToken , refreshToken, profile, "user",user );

      return cb(null, user);

  }
));


module.exports = passport ;


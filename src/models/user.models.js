
const mongoose = require("mongoose");

const bcrypt = require("bcrypt")


const userSchema =  new mongoose.Schema({
   firstname : {type : String },
   lastname : {type : String },
   email : {type : String , required : true , unique : true },
   password : {type : String , required : true},

},{
   timestamps : true,
   versionKey : false
})

userSchema.pre("save", function(next){
  const hash = bcrypt.hashSync( this.password , 8 );
        this.password = hash ;
        return next();
}  )


userSchema.methods.checkPassword = function(password){
        return bcrypt.compareSync( password, this.password); 
}


module.exports = mongoose.model("webledgeUsers", userSchema);



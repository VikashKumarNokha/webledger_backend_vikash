
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id : {type : Number , required : true, unique : true},  
  title : {type : String , required : true},
  image : {type : String , required : true},
  user_id : {type:  mongoose.Schema.Types.ObjectId,  ref : "webledgeUsers", required : true  }
},{
   timestamps : true,
   versionKey : false
})

module.exports = mongoose.model("favProduct", productSchema);


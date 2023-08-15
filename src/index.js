const express = require("express");

const app = express();

app.use(express.json());


app.get("/", (req, res)=>{
       return res.status(200).send("Hello server");
})


app.listen(5000, async ()=>{
      try{
        console.log("server running on port 5000");
      }catch(err){
         console.log("error", err);
      }
     
})
const express = require("express");

const app = express();

app.use(express.json());

const connect = require("./configs/db");

const {register, login, genearteTocken} = require("./controllers/auth.controller")



app.get("/", (req, res)=>{
       return res.status(200).send("Hello server");
})

app.post("/register", register);
app.post("/login", login);



app.listen(5000, async ()=>{
      try{
           await connect();
        console.log("server running on port 5000");
      }catch(err){
         console.log("error", err);
      }
     
})
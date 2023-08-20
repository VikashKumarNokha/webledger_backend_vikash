const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


const passport = require("./configs/google-oauth")
const connect = require("./configs/db");
const {register, login, genearteTocken} = require("./controllers/auth.controller")
const productController = require("./controllers/product.controller")



app.get("/", (req, res)=>{
       return res.status(200).send("Hello server");
})

app.post("/register", register);
app.post("/login", login);

app.use("/favproduct", productController);


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', "email" ],  }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session : false }),
  function(req, res) {
    // Successful authentication, redirect home.
     const tocken = genearteTocken(req.user);
    res.status(200).send({"user" : req.user, "tocken" : tocken}) ;
  });



app.listen(5000, async ()=>{
      try{
           await connect();
        console.log("server running on port 5000");
      }catch(err){
         console.log("error", err);
      }
     
})
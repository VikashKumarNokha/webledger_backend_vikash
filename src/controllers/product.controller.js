
const router = require("express").Router();

const productSchema = require("../models/product.models")


router.post("/",   async (req, res)=>{
         
    try{
        const product = await productSchema.findOne({ id : req.body.id });
        if(product){
         return res.status(200).json( {message : "Item already added in faverate cart" } )
        }

      const newproduct = await productSchema.create({...req.body });
       
      return res.status(200).send(newproduct);

    }catch(err){
        return res.status(400).send(err);
    }
}) 




router.get("/",  async (req, res)=>{
  
   try{
     const products = await productSchema.find(req.body)
     
      
     return res.status(200).send({ products  });

   }catch(err){
       return res.status(400).send(err);
   }
}) 



module.exports = router ;
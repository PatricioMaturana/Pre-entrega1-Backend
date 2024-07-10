const express = require("express")
const router = express.Router()
const products=[]

router.get("/products",(req,res)=>{
    res.json(products)
})

router.post("/products",(req,res)=>{
    const newProducto = req.body
    products.push(newProducto)
    res.json({message:"Producto agregado"})
})

module.exports = router;
const express = require("express")
const router = express.Router()
const carts=[]

router.get("/api/carts",(req,res)=>{
    res.json(carts)
})

router.post("/api/carts",(req,res)=>{
    const newCarts = req.body
    products.push(newCarts)
    res.json({message:"Producto agregado al Carro"})
})

module.exports = router;
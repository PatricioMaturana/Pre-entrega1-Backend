const express = require("express")
const router = express.Router()
const carts=[]

router.get("/carts",(req,res)=>{
    res.json(carts)
})

router.post("/carts",(req,res)=>{
    const newCarts = req.body
    products.push(newCarts)
    res.json({message:"Producto agregado al Carro"})
})

module.exports = router;
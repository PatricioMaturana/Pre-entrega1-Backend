const express = require("express")
const productsRouter = require("./routes/api/products.js")
//const cartsRouter    = require("./routes/api/carts.js")

const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/",productsRouter)
//app.use("/",cartsRouter)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

const express = require("express")
const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

let array =[
    {id: 1, title: "uno"},
    {id: 2, title: "dos"},
    {id: 3, title: "tres"}
]

app.get('/ejemplo',(req,res)=> {
    res.json(array)
})

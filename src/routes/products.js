const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require("path");
const products=[];

router.get("/products",(req,res)=>{
    if (fs.existsSync('productos.json') )
    {
        fs.readFile('productos.json','utf8',(err,data)=>{
            if(err)
            {
                console.error(err);
                return res.status(500).json({error:'Error servidor interno'});
            }else{
                const products = JSON.parse(data);
                res.json(products);
            }    
        });
    };
    return res.status(204).json({error:'No hay datos'});
});
router.post("/products",(req,res)=>{
    const {id, title, description, price, status, stock, category }= req.body;
    if (fs.existsSync('productos.json') )
    {
        fs.readFile('productos.json','utf8',(err,data)=>{
            if(err)
            {
                  console.error(err);
                return res.status(500).json({error:'Error servidor interno'});
            }else
            {
                const contenidoJson = JSON.parse(data);
                const producto = contenidoJson.find(producto => producto.id == id) 
                if (producto)
                {
                    return res.status(404).json({mensage:`Producto ya existe`});
                }
                products.push({ id, title, description, price, status, stock, category });
                fs.writeFile('productos.json', JSON.stringify(products,null,2),err =>{
                if(err){
                  console.error(err);
                  return res.status(500).json({error: 'Error Interno'});
                }  
                res.json(products);
                });
            }
            
        })
    }else
    {
        products.push({ id, title, description, price, status, stock, category });
        fs.writeFile('productos.json', JSON.stringify(products,null,2),err =>{
            if(err){
                  console.error(err);
                  return res.status(500).json({error: 'Error Interno'});
            }  
            res.json(products);
          });
    }
})

module.exports = router;
const express = require("express")
const router = express.Router()
const fs = require('fs');

const carts=[]

router.get("/api/carts",(req,res)=>{
    res.json(carts)
})

router.post("/api/carts",(req,res)=>{
    const {id, products} = req.body;
    if(id && products){

        if (fs.existsSync('carts.json') )
            {
                fs.readFile('carts.json','utf8',(err,data)=>{
                    if(err)
                    {
                        console.error(err);
                        return res.status(500).json({error:'Error servidor interno'});
                    }else
                    {
                        const contenidoJson = JSON.parse(data);
                        const newId = contenidoJson.length > 0 ? Math.max(...(contenidoJson.map(p => p.id))) + 1 : 1;
                        console.log(newId)
                        carts.push({ id:newId, products });
                        fs.writeFile('carts.json', JSON.stringify(carts,null,2),err =>{
                        if(err){
                          console.error(err);
                          return res.status(500).json({error: 'Error Interno'});
                        }  
                        res.json(carts);
                        });
                    }
                    
                })
            }else
            {
                carts.push({ id:1, products });
                fs.writeFile('carts.json', JSON.stringify(carts,null,2),err =>{
                    if(err){
                          console.error(err);
                          return res.status(500).json({error: 'Error Interno'});
                    }  
                    res.json(carts);
                  });
            }



    }
})

module.exports = router;
const express = require("express")
const router = express.Router()
const fs = require('fs');

const carts=[]

router.post("/api/carts",(req,res)=>{
    const {id, products} = req.body;
    if (fs.existsSync('carrito.json') )
    {
                fs.readFile('carrito.json','utf8',(err,data)=>{
                    if(err)
                    {
                        console.error(err);
                        return res.status(500).json({error:'Error servidor interno'});
                    }else
                    {
                        const contenidoJson = JSON.parse(data);
                        const newId = contenidoJson.length > 0 ? Math.max(...(contenidoJson.map(p => p.id))) + 1 : 1;
                        carts.push({ id:newId, products });
                        fs.writeFile('carrito.json', JSON.stringify(carts,null,2),err =>{
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
        fs.writeFile('carrito.json', JSON.stringify(carts,null,2),err =>{
        if(err){
            console.error(err);
            return res.status(500).json({error: 'Error Interno'});
        }  
        res.json(carts);
        });
    }
})


router.post("/api/carts/:cid/products/:pid", (req, res) => {
    const idCarts = parseInt(req.params.cid);
    const idProducto = parseInt(req.params.pid);
    const { quantity } = req.body;
    // Verificar si el carrito existe en carts.json
    if (!fs.existsSync('carrito.json')) {
        return res.status(404).json({ message: 'Archivo de carritos no encontrado' });
    }

    // Verificar si el producto existe en productos.json
    if (!fs.existsSync('productos.json')) {
        return res.status(404).json({ message: 'Archivo de productos no encontrado' });
    }

    // Leer el archivo de carritos
    fs.readFile('carrito.json', 'utf8', (err, cartsData) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al leer el archivo de carritos' });
        }

        let carritos = JSON.parse(cartsData);
        const carrito = carritos.find(c => c.id === idCarts);

        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Leer el archivo de productos
        fs.readFile('productos.json', 'utf8', (err, productsData) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al leer el archivo de productos' });
            }

            let productos = JSON.parse(productsData);
            const producto = productos.find(p => p.id === idProducto);

            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            // Agregar o actualizar el producto en el carrito
            const productInCart = carrito.products.find(p => p.id === idProducto);

            if (productInCart) {
                // Si el producto ya está en el carrito, actualizar la cantidad
                productInCart.quantity += quantity;
            } else {
                // Si el producto no está en el carrito, agregarlo con la cantidad inicial
                carrito.products.push({ id: idProducto, quantity });
            }

            // Guardar los cambios en carts.json
            fs.writeFile('carrito.json', JSON.stringify(carritos, null, 2), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Error al actualizar el carrito' });
                }

                res.json(carrito);
            });
        });
    });
});


router.get("/api/carts/:cid", (req, res) => {
    const idCarts = parseInt(req.params.cid);
    // Verificar si el archivo carts.json existe
    if (!fs.existsSync('carrito.json')) {
        return res.status(404).json({ message: 'Archivo de carritos no encontrado' });
    }

    // Verificar si el archivo productos.json existe
    if (!fs.existsSync('productos.json')) {
        return res.status(404).json({ message: 'Archivo de productos no encontrado' });
    }

    // Leer el archivo de carritos
    fs.readFile('carrito.json', 'utf8', (err, cartsData) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al leer el archivo de carritos' });
        }

        let carritos = JSON.parse(cartsData);
        const carrito = carritos.find(c => c.id === idCarts);

        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Leer el archivo de productos
        fs.readFile('productos.json', 'utf8', (err, productsData) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al leer el archivo de productos' });
            }

            let productos = JSON.parse(productsData);

            // Obtener los detalles completos de los productos en el carrito
            let productosEnCarrito = carrito.products.map(item => {
                let producto = productos.find(p => p.id === item.id);
                return {quantity: item.quantity, producto
                };
            });

            res.json({
                id: carrito.id,
                products: productosEnCarrito
            });
        });
    });
});

module.exports = router;
import express from 'express';
import ProductManager from "./managers/ProductManager.js";


const PORT = 8080;

const app = express();

app.use(express.urlencoded({extended:true}))

const manager = new ProductManager();


    app.get('/products', async (req,res)=>{
        try {
            let {limit} = req.query;
            const products = await manager.getProducts();
            if(isNaN (limit) || limit == "" || limit < 0){
                return res.send({products})
            }
            const misProducts = products.slice(0,limit)
            return res.send({misProducts})  

        } catch (error) {
            console.log(error)
        }
    })

    app.get('/products/:pid', async (req,res)=>{
        try {
            const products = await manager.getProducts();
            const idProduct = req.params.pid;
            const productFind = products.find(prod => {
                return prod.id == idProduct
            })
        
            if(!productFind){
                return res.send({
                    error: 'product not found'
                })
            }
            res.json({productFind})

        } catch (error) {
            console.log(error)
        }
       
    })


app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto:${PORT}`)
})


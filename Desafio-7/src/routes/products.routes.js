import {Router} from "express";
import { ProductManagerDB } from "../dao/dbManagers/ProductManagerDB.js";

const router = Router();
const productManagerDB = new ProductManagerDB();

router.get('/', async (req, res) => {
    try {
        const { limit, page, sort, category, availability, query} = req.query
        const products = await productManagerDB.getProducts(limit, page, sort, category, availability, query)
        res.send({
            status: "success",
            products: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 'error',
            msg: 'Internal server error',
        });
    }
});
  
  
  router.post("/", async (req, res) => {
    const newProduct = req.body;
  
    try {
      const createdProduct = await productManager.addProduct(newProduct);
      io.emit('realTimeProductsUpdate', { products: 'lista actualizada de productos' });
      res.json(createdProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/:pid', async (req,res)=>{
    res.send({
        status:"succes",
        msg:"Ruta GET ID PRODUCTS"
    })
})
router.post('/', async (req,res)=>{ //creo

    const product = req.body;//json con el producto
    const products = await productManagerDB.createProduct(product);

    res.send({
        status:"succes",
        msg:"Producto creado",
        productos: products
    })
})
router.put('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    res.send({
        status:"succes",
        msg:`Ruta PUT de PRODUCTS con ID: ${pid}`
    })
})
router.delete('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    res.send({
        status:"succes",
        msg:`Ruta DELETE de PRODUCTS con ID: ${pid}`
    })
})

export {router as productRouter};
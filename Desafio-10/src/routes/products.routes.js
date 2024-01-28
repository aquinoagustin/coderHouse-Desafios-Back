import {Router} from "express";
import ProductManagerDB  from "../dao/dbManagers/ProductManagerDB.js";

const router = Router();

const productService = new ProductManagerDB();
router.get('/', async (req, res) => {
    try {
        const { limit, page, sort, category, availability, query} = req.query
        const products = await productService.getAll(limit, page, sort, category, availability, query)
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
  
router.post('/', async (req,res)=>{ //creo

    const product = req.body;//json con el producto
    const products = await productService.saveProduct(product);

    res.send({
        status:"succes",
        msg:"Producto creado",
        productos: products
    })
})


router.get('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    const result = await productService.getBy({_id:pid});
    res.send({
        status:"success",
        msg:`Product ${pid} `,
        result
    })
})
router.put('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    const prod = req.body;
    const result = await productService.updateProduct(pid,prod)
    res.send({
        status:"success",
        msg:`Ruta PUT de PRODUCTS con ID: ${pid}`,
        result
    })
})
router.delete('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    res.send({
        status:"success",
        msg:`Ruta DELETE de PRODUCTS con ID: ${pid}`
    })
})

export {router as productRouter};
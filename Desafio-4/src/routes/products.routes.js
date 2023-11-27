import {Router} from 'express';
import {ProductManagerFile} from '../managers/ProductMangerFile.js';

const path = 'products.json';
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/',async (req,res)=>{
    let {limit} = req.query;
    const products = await productManagerFile.getProducts(limit);
    res.send({
        msg:'Todos los productos',
        products
    })
    

})
router.get('/:pid',async (req,res)=>{
    const pid = req.params.pid;
    const products = await productManagerFile.getProductId(pid);
    res.send({
        msg:'Product by ID',
        products
    })
})


router.post('/', async (req,res)=>{ //creo

    const product = req.body;//json con el producto
    const products = await productManagerFile.createProduct(product);

    res.send({
        status:"success",
   //     msg:"Producto creado",
        productos: products
    })
})

router.put('/:pid',async (req,res)=>{
    const pid = req.params.pid;
    const product = req.body;
    const products = await productManagerFile.updateProduct(pid,product)
    res.send({
        status:'success',
        msg:`Ruta PUT con ID: ${pid} PRODUCTS`,
        products
    })
})
router.delete('/:pid',async(req,res)=>{
    const pid = req.params.pid;
    const products = await productManagerFile.deleteProduct(pid)
    res.send({
        status:"success",
        msg:`Ruta DELETE con ID: ${pid} PRODUCTOS`,
        products
    })
})

export {router as productRouter}
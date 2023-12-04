import {Router} from 'express';
import {ProductManagerFile} from '../managers/ProductMangerFile.js';

const path = 'products.json';
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/',async (req,res)=>{
    let {limit} = req.query;
    const products = await productManagerFile.getProducts(limit);
    if(products.length == 0)res.send({msg:'there are no products'})
    if(products.length !=0){res.send({msg:'all the products',products})}

    

})
router.get('/:pid',async (req,res)=>{
    const pid = req.params.pid;
    const products = await productManagerFile.getProductId(pid);
    if(products == false)res.send({msg:'product not found'})
    if(products)res.send({msg:'Product by ID',products})
})


router.post('/', async (req,res)=>{ //creo

    const product = req.body;//json con el producto
    const products = await productManagerFile.createProduct(product);
    if(products === false)res.send({msg:'invalid field'})
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
    if(products == -1)res.send({msg:'invalid field'})
    if(products == -2)res.send({msg:'product not found'})
    res.send({
        status:'success',
        msg:`Ruta PUT con ID: ${pid} PRODUCTS`,
        products
    })
})
router.delete('/:pid',async(req,res)=>{
    const pid = req.params.pid;
    const products = await productManagerFile.deleteProduct(pid)
    if(products == false)res.send({msg:'product not found'})
    res.send({
        status:"success",
        msg:`remove product`,
        products
    })
})

export {router as productRouter}
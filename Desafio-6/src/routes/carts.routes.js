import {Router} from 'express';
import {CartManagerFile} from '../dao/managers/CartManagerFile.js';
import {ProductManagerFile} from '../dao/managers/ProductMangerFile.js';

const path = 'carts.json';
const router = Router();
const cartManagerFile = new CartManagerFile(path);
const productManagerFile = new ProductManagerFile('products.json')


router.get('/:cid',async (req,res)=>{
    const cid = req.params.cid;
    const carts = await cartManagerFile.getCartId(cid);
    if(carts === false)res.send({msg:'cart not found'})
    if(carts)res.send({msg:'cart by ID',carts})
})
router.post('/',async (req,res)=>{ //creo
    const cart = req.body;
    const carts = await cartManagerFile.addCart(cart);
    if(carts === false)res.send({msg:'invalid field'})
    res.send({status:"success",carts})
})
router.post('/:cid/product/:pid',async (req,res)=>{ //creo
    const cid = req.params.cid;
    const pid = req.params.pid;
    const prodExist = await productManagerFile.getProductId(pid);
    if(prodExist){
        const carts = await cartManagerFile.addCartAndProduct(cid,pid)
        res.send(carts)
    }else{
        res.send({msg:'product not found'})
    }
    /*

    res.send(carts)*/
   /* res.send({
        status:'success',
        msg:`Ruta POST CART - Agrego producto al carrito.  CID: ${cid} PID: ${pid}`
    })*/
})

export {router as cartRouter};
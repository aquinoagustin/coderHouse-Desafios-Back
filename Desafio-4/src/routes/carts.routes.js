import {Router} from 'express';
import {CartManagerFile} from '../managers/CartManagerFile.js';


const path = 'carts.json';
const router = Router();
const cartManagerFile = new CartManagerFile(path);


router.get('/:cid',async (req,res)=>{
    const cid = req.params.cid;
    const carts = await cartManagerFile.getCartId(cid);
    res.send(carts)
   /* res.send({
        status:'success',
        msg:`Ruta GET con ID: ${cid} CART`
    })*/
})
router.post('/',async (req,res)=>{ //creo
    const cart = req.body;
    const carts = await cartManagerFile.addCart(cart);
    res.send(carts)
    /*res.send({
        status:'success',
        msg:'Ruta POST CART'
    })*/
})
router.post('/:cid/product/:pid',async (req,res)=>{ //creo
    const cid = req.params.cid;
    const pid = req.params.pid;
    const carts = await cartManagerFile.addCartAndProduct(cid,pid)
    res.send(carts)
   /* res.send({
        status:'success',
        msg:`Ruta POST CART - Agrego producto al carrito.  CID: ${cid} PID: ${pid}`
    })*/
})
router.put('/:cid',async (req,res)=>{
    const cid = req.params.cid;
    const cart = req.body;
    const carts = await cartManagerFile.updateCart(cid,cart);
    res.send(carts)
    /*
    res.send({
        status:'success',
        msg:`Ruta PUT con ID: ${cid} CART`
    })*/
})
router.delete('/:cid',async(req,res)=>{
    const cid = req.params.cid
    res.send({
        status:"success",
        msg:`Ruta DELETE con ID: ${cid} CART`
    })
})

export {router as cartRouter};
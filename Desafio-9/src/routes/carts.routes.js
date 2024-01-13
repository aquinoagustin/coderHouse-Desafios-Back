import {Router} from "express";
import {CartManagerDB} from "../dao/dbManagers/CartManagerDB.js";

const router = Router();

const cartManagerMongo = new CartManagerDB();

router.get('/', async (req,res)=>{

    const carts = await cartManagerMongo.getCarts();

    res.send({
        status:"succes",
        carritos: carts
    })
})

router.get('/:cid', async (req,res)=>{
    const cid = req.params.cid;
    const cart = await cartManagerMongo.getCartByID(cid)
    res.send({
        status:"succes",
        msg:cart
    })
})
router.post('/', async (req,res)=>{ //creo
    const cart = await cartManagerMongo.createCart()
    res.send({
        status:"succes",
        msg: cart
    })
})
router.post("/:cid/product/:pid", async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity
    const carts = await cartManagerMongo.addProductInCart(cid,pid,quantity)
    res.send({
        carts
    })
})


router.put("/:cid", async (req, res) => {
  const cid  = req.params.cid;
  const updatedProducts = req.body;
    const updatedCart = await cartManagerMongo.editCart(cid, updatedProducts);
    res.send({updatedCart})
});
router.put('/:cid/product/:pid', async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    const carts = await cartManagerMongo.editProductCartQuantity(cid,pid,quantity);
    res.send({
        status:"success",
        msg: carts
    })
})

router.delete('/:cid/product/:pid', async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartManagerMongo.deleteProductCart(cid,pid)
    res.send({
        cart
    })
})

router.delete('/:cid', async (req,res)=>{
    const cid = req.params.cid;
    const cart = await cartManagerMongo.deleteProductCartAll(cid)
    res.send({
        cart
    })
})

export {router as cartRouter};
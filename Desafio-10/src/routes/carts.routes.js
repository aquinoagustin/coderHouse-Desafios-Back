import {Router} from "express";
import CartManagerDB from "../dao/dbManagers/CartManagerDB.js";

const router = Router();

const cartService = new CartManagerDB();
router.get('/', async (req,res)=>{

    const carts = await cartService.getAll();

    res.send({
        status:"succes",
        carritos: carts
    })
})

router.get('/:cid', async (req,res)=>{
    const cid = req.params.cid;
    const cart = await cartService.getBy({_id:cid})
    res.send({
        status:"succes",
        msg:cart
    })
})
router.post('/', async (req,res)=>{
    const cart = await cartService.saveCart()
    res.send({
        status:"succes",
        msg: cart
    })
})
router.post("/:cid/product/:pid", async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity
    const carts = await cartService.addProductInCart(cid,pid,quantity)
    res.send({
        carts
    })
})


router.put("/:cid", async (req, res) => {
  const cid  = req.params.cid;
  const updatedProducts = req.body;
    const updatedCart = await cartService.editCart(cid, updatedProducts);
    res.send({updatedCart})
});
router.put('/:cid/product/:pid', async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    console.log(quantity)
    const carts = await cartService.editProductCartQuantity(cid,pid,quantity);
    res.send({
        status:"success",
        msg: carts
    })
})

router.delete('/:cid/product/:pid', async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartService.deleteProductCart(cid,pid)
    res.send({
        cart
    })
})

router.delete('/:cid', async (req,res)=>{
    const cid = req.params.cid;
    const cart = await cartService.deleteProductCartAll(cid)
    res.send({
        cart
    })
})

export {router as cartRouter};
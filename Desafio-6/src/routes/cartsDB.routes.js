
import { Router } from "express";
import { uploader } from "../utils.js";
import { CartManagerFileDB } from "../dao/managersDB/CartManagerFile.js";


const path = 'carts.json';
const router = Router();
const cartManagerFile = new CartManagerFileDB(path);








router.get("/:cid", async (req,res)=>{


    const cid = req.params.cid;
    const getCart = await cartManagerFile.getCart(cid);    
    res.send(getCart)
})






router.post("/", uploader.single("thumbnail") ,async (req,res)=>{

    const cart = req.body;
    const carts = await cartManagerFile.addCart(cart);
    res.send(carts)
})



router.post("/:cid/product/:pid", async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const carts = await cartManagerFile.addCartAndProduct(cid,pid)
    res.send(carts)
})






export {router as cartRouterDB};
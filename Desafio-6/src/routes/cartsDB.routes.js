
import { Router } from "express";
import productModel from "../dao/models/products.model.js";
import { uploader } from "../utils.js";
import cartModel from "../dao/models/carts.model.js";
import { CartManagerFileDB } from "../dao/managersDB/CartManagerFile.js";


const path = 'carts.json';
const router = Router();
const cartManagerFile = new CartManagerFileDB(path);








router.get("/:cid", async (req,res)=>{


    const id = req.params.cid;
    const carts = await cartModel.find({_id:id})
    console.log(carts)
    
    res.send({
        status: "success",
        message: carts
    })
})






router.post("/", uploader.single("thumbnail") ,async (req,res)=>{

    const cart = req.body;
    const carts = await cartManagerFile.addCart(cart);
    if(carts === false)res.send({msg:'invalid field'})
    res.send({status:"success",carts})
})



router.post("/:cid/product/:pid", async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const prodExist = await productModel.find({_id:pid})
    if(prodExist){
        const carts = await cartManagerFile.addCartAndProduct(cid,pid)
        res.send(carts)
    }



})






export {router as cartRouterDB};
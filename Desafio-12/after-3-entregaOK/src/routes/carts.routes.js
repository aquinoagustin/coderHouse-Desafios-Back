import { Router } from "express";
import { CartModel} from "../daos/models/cart.model.js";
import { ProductModel} from "../daos/models/product.model.js";
import {v4 as uuidv4} from 'uuid';
import { ticketsModel } from "../daos/models/ticket.model.js";
import { purchase } from "../controllers/carts.controller.js";

const router = Router();

router.post("/",async(req,res)=>{
    try {
        const cartCreated = await CartModel.create({});
        res.send(cartCreated)
    } catch (error) {
        res.send(error.message)
    }
});
router.get("/",async(req,res)=>{
    try {
        const cartCreated = await CartModel.find();
        res.send(cartCreated)
    } catch (error) {
        res.send(error.message)
    }
});

router.put("/",async(req,res)=>{
    try {
        const {cartId, productId, quantity} = req.body;
        const cart = await CartModel.findById(cartId);
        cart.products.push({id:productId,quantity:quantity});
        cart.save();
        res.send("producto agregado")
    } catch (error) {
        res.send(error.message)
    }
});

router.post("/:cid/purchase",purchase);

export {router as cartsRouter}
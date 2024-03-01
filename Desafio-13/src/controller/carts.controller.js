import {cartsDao} from '../dao/index.js';
import { productsDao } from '../dao/index.js';

class CartController{
    static getCart = async (req,res)=>{
        const carts = await cartsDao.getAll();
        res.send({
            status:"succes",
            carritos: carts
        })
    }

    static getBy = async (req,res)=>{
        const cid = req.params.cid;
        const cart = await cartsDao.getBy({_id:cid})
        res.send({
            status:"succes",
            msg:cart
        })
    }
    static saveCart = async (req,res)=>{
        const cart = await cartsDao.saveCart()
        res.send({
            status:"succes",
            msg: cart
        })
    }
    static addProductInCart = async (req,res)=>{
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity
        const carts = await cartsDao.addProductInCart(cid,pid,quantity)
        res.send({
            carts
        })
    }
    static editCart = async (req, res) => {
        const cid  = req.params.cid;
        const updatedProducts = req.body;
          const updatedCart = await cartsDao.editCart(cid, updatedProducts);
          res.send({updatedCart})
      }
    static editProductCartQuantity = async (req,res)=>{
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
        console.log(quantity)
        const carts = await cartsDao.editProductCartQuantity(cid,pid,quantity);
        res.send({
            status:"success",
            msg: carts
        })
    }
    static deleteProductCart = async (req,res)=>{
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cart = await cartsDao.deleteProductCart(cid,pid)
        res.send({
            cart
        })
    }
    static deleteProductCartAll = async (req,res)=>{
        const cid = req.params.cid;
        const cart = await cartsDao.deleteProductCartAll(cid)
        res.send({
            cart
        })
    }
    static finalizePurchase = async (req, res) => {
        const cid = req.params.cid;
        const email = req.body.email;
        const result = await cartsDao.finalizePurchase(cid,email)
        res.send({
            result
        })

    }
}
export {CartController};
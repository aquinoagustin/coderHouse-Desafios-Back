import {CartService} from '../service/CartManagerDB.service.js';


class CartController{
    static getCart = async (req,res)=>{
        const carts = await CartService.getAll();
        res.send({
            status:"succes",
            carritos: carts
        })
    }
    static getBy = async (req,res)=>{
        const cid = req.params.cid;
        const cart = await CartService.getBy({_id:cid})
        res.send({
            status:"succes",
            msg:cart
        })
    }
    static saveCart = async (req,res)=>{
        const cart = await CartService.saveCart()
        res.send({
            status:"succes",
            msg: cart
        })
    }
    static addProductInCart = async (req,res)=>{
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity
        const carts = await CartService.addProductInCart(cid,pid,quantity)
        res.send({
            carts
        })
    }
    static editCart = async (req, res) => {
        const cid  = req.params.cid;
        const updatedProducts = req.body;
          const updatedCart = await CartService.editCart(cid, updatedProducts);
          res.send({updatedCart})
      }
    static editProductCartQuantity = async (req,res)=>{
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
        console.log(quantity)
        const carts = await CartService.editProductCartQuantity(cid,pid,quantity);
        res.send({
            status:"success",
            msg: carts
        })
    }
    static deleteProductCart = async (req,res)=>{
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cart = await CartService.deleteProductCart(cid,pid)
        res.send({
            cart
        })
    }
    static deleteProductCartAll = async (req,res)=>{
        const cid = req.params.cid;
        const cart = await CartService.deleteProductCartAll(cid)
        res.send({
            cart
        })
    }

}

export {CartController};
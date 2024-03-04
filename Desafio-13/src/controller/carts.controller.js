import {cartsDao} from '../dao/index.js';
import {cartsError} from '../errores.js';

class CartController{
    static getCart = async (req,res)=>{
        try {
            const carts = await cartsDao.getAll();
            res.send({
                status:"success",
                carritos: carts
            })
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:cartsError.getCart
            })
        }

    }

    static getBy = async (req,res)=>{
        try {
            const cid = req.params.cid;
            const cart = await cartsDao.getBy({_id:cid})
            res.send({
                status:"success",
                msg:cart
            })
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:cartsError.getBy
            })
        }

    }
    static saveCart = async (req,res)=>{
        try {
            const cart = await cartsDao.saveCart()
            res.send({
                status:"success",
                msg: cart
            })       
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:cartsError.saveCart
            })
        }

    }
    static addProductInCart = async (req,res)=>{
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const quantity = req.body.quantity
            const carts = await cartsDao.addProductInCart(cid,pid,quantity)
            res.send({
                status:'success',
                carts
            })  
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:cartsError.addProductInCart
            })
        }

    }
    static editCart = async (req, res) => {
        try {
            const cid  = req.params.cid;
            const updatedProducts = req.body;
            const updatedCart = await cartsDao.editCart(cid, updatedProducts);
            res.send({
                status:'success',
                msg:updatedCart
            })     
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:cartsError.editCart
            })
        }

      }
    static editProductCartQuantity = async (req,res)=>{
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const quantity = req.body.quantity;
            console.log(quantity)
            const carts = await cartsDao.editProductCartQuantity(cid,pid,quantity);
            res.send({
                status:"success",
                msg: carts
            })    
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:cartsError.editProductCartQuantity
            })
        }

    }
    static deleteProductCart = async (req,res)=>{
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const cart = await cartsDao.deleteProductCart(cid,pid)
            res.send({
                status:'success',
                msg:cart
            }) 
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:cartsError.deleteProductCart
            })
        }

    }
    static deleteProductCartAll = async (req,res)=>{
        try {
            const cid = req.params.cid;
            const cart = await cartsDao.deleteProductCartAll(cid)
            res.send({
                status:'success',
                msg:cart
            })    
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:cartsError.deleteProductCartAll
            })
        }

    }
    static finalizePurchase = async (req, res) => {
        try {
            const cid = req.params.cid;
            const email = req.body.email;
            const result = await cartsDao.finalizePurchase(cid,email)
            res.send({
                status:'success',
                msg:result
            })   
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:cartsError.finalizePurchase
            })
        }


    }
}
export {CartController};
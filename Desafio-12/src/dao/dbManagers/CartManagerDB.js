import cartsModel from "../models/cart.models.js";
import {ProductManagerDB} from './ProductManagerDB.js';
export class CartManagerDB {

    constructor(){
        this.modelCart = cartsModel;
        this.managerProduct = ProductManagerDB;
    }

    getAll = async () => {
        const carts = await this.modelCart.find().populate('products.product');
        return carts;
    }


    getBy = async (params) => {
        let result = await this.modelCart.findOne(params);
        return result;
    }


    saveCart = async () => {
        let result = await this.modelCart.create({});
        return result;
    }




    addProductInCart = async (cid, pid, quantity) => {
        try {
            if(quantity === undefined){
                quantity = 1;
            }
            const cart = await this.getBy({_id:cid});
            if (!cart){
                return {
                    status: "error",
                    msg: `El carrito con el id ${cid} no existe`
                } 
            };
            const product = await this.managerProduct.getBy({_id:pid});
            if (!product){
                return {
                    status: "error",
                    msg: `El producto con el id ${pid} no existe`
                } 
            };
            let productsInCart = cart.products;
            
            const indexProduct = productsInCart.findIndex((product)=> product.product == pid );
    
            if(indexProduct == -1){
                const newProduct = {
                    product: pid,
                    quantity: quantity
                }
                cart.products.push(newProduct);
            }else{
                cart.products[indexProduct].quantity += quantity;
            }
               
            await cart.save();
            
            return cart;     
        } catch (error) {
            console.log(error)
        }
        
    
    }
    deleteProductCart = async (cid,pid) => {
        try {
            const cart = await this.getBy({_id:cid});
        if (!cart){
            return {
                status: "error",
                msg: `El carrito con el id ${cid} no existe`
            } 
        };
        const product = await this.managerProduct.getBy({_id:pid});
        if (!product){
            return {
                status: "error",
                msg: `El producto con el id ${pid} no existe`
            } 
        };
        let productsInCart = cart.products;
        
        const indexProduct = productsInCart.findIndex((product)=> product.product == pid );
        if(indexProduct == -1){
            return{
                status:'error',
                msg:`El producto con el id ${pid} no exíste en el carrito`
            }
        }else{
            cart.products.splice(indexProduct)
        }
        await cart.save();
        return cart
        } catch (error) {
            console.log(error)
        }
        
    }

    deleteProductCartAll = async (cid) => {
        try {
            const cart = await this.getBy({_id:cid});
            if (!cart){
                return {
                    status: "error",
                    msg: `El carrito con el id ${cid} no existe`
                } 
            };
            cart.products.splice(cart.length)
            await cart.save();
            return cart    
        } catch (error) {
            console.log(error)
        }


    }
    async editCart(cid, updatedProducts) {
        try {
          const cart = await this.getBy({_id:cid});
          if (!cart) {
            return{
                status: "error",
                msg: `El carrito con el ID ${cid} no existe`
            }
          }
          console.log(updatedProducts)
          cart.products = updatedProducts;
          await cart.save();
          return cart;
        } catch (error) {
            console.log(error)
        }
      }

    editProductCartQuantity = async(cid,pid,quantity) => {
        try {
            const cart = await this.getBy({_id:cid});
            if (!cart){
                return {
                    status: "error",
                    msg: `El carrito con el id ${cid} no existe`
                } 
            };
            const product = await this.managerProduct.getBy({_id:pid});
            if (!product){
                return {
                    status: "error",
                    msg: `El producto con el id ${pid} no existe`
                } 
            };
            let productsInCart = cart.products;
            if(!quantity){
                return {
                    status: "error",
                    msg: `La cantidad: ${quantity} no es valida `
                } 
            }
            const indexProduct = productsInCart.findIndex((product)=> product.product == pid );
            if(indexProduct == -1){
                return{
                    status:'error',
                    msg:`El producto con el id ${pid} no exíste en el carrito`
                }
            }else{
                cart.products[indexProduct].quantity = quantity;
            }
            await cart.save();
            return cart    
        } catch (error) {
            console.log(error)
        }
        
    }
}


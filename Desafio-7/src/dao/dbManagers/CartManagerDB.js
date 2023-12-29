import cartsModel from "../models/cart.models.js";
import productsModel from "../models/products.models.js";

class CartManagerDB {

    getCarts = async () => {
        try {
            const carts = await cartsModel.find().populate('products.product');
            return carts;   
        } catch (error) {
            console.log(error)
        }
    }
    getCartByID = async (cid) => {
        try {
            const cart = await cartsModel.find({_id:cid}).populate('products.product');
            return cart;
        } catch (error) {
            console.log(error)
        }

    }
    createCart = async () => {
        try {
            const cart = await cartsModel.create({});
            return cart;  
        } catch (error) {
            console.log(error)
        }

    }
    addProductInCart = async (cid, pid, quantity = 1) => {
        try {
            const cart = await cartsModel.findOne({_id:cid});
            if (!cart){
                return {
                    status: "error",
                    msg: `El carrito con el id ${cid} no existe`
                } 
            };
            const product = await productsModel.findOne({_id:pid});
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
            const cart = await cartsModel.findOne({_id:cid});
        if (!cart){
            return {
                status: "error",
                msg: `El carrito con el id ${cid} no existe`
            } 
        };
        const product = await productsModel.findOne({_id:pid});
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
            const cart = await cartsModel.findOne({_id:cid});
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
          const cart = await cartsModel.findOne({ _id: cid })
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
            const cart = await cartsModel.findOne({_id:cid});
            if (!cart){
                return {
                    status: "error",
                    msg: `El carrito con el id ${cid} no existe`
                } 
            };
            const product = await productsModel.findOne({_id:pid});
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

export {CartManagerDB};
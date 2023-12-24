import path from 'path';
import __dirname from '../../utils.js'
import cartsModel from '../models/carts.model.js';
import productsModel from '../models/products.model.js';



class CartManagerFileDB{
    constructor(pathFile){
        this.path = path.join(__dirname,`/files/${pathFile}`)
    }


    
    getCart = async (cid) => {
        try {
            const cart = await cartsModel.find({_id:cid})
            return cart;
        } catch (error) {
            console.log(error)
        }
    }


    getCarts = async () => {
        try {
            const carts = await cartsModel.find();
            return carts;
        } catch (error) {
            console.log(error)
        }

    }



    
    addCart = async() =>{
        try {
            const cart = await cartsModel.create({})
            return {msg:'Success',cart}
        } catch (error) {
            console.log(error)
        }
    }



    addCartAndProduct = async (cid,pid) => {
        try {
            const cart = await cartsModel.findOne({_id:cid});
            if(!cart){
                return{
                    status:'error',
                    msg:`El carrito con el id: ${cid} no existe`
                }
            }
            const product = await productsModel.findOne({_id:pid})
            if(!product){
                return{
                    status:'error',
                    msg:`El producto con el id: ${pid} no existe`
                }
            }
            let productsInCart = cart.product;
            const indexProduct = productsInCart.findIndex((item)=>item.product == pid);
            if(indexProduct == -1){
                const newProduct = {
                    product:pid,
                    quantity:1
                }
                cart.product.push(newProduct);
            }else{
                cart.product[indexProduct].quantity+=1;
            }
            await cart.save();
            return{
                status:'success',
                msg:cart
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export {CartManagerFileDB};

import cartsModel from "../models/cart.models.js";
import {ProductManagerDB} from './ProductManagerDB.js';
import {ticketsModel} from '../models/ticket.model.js';
import productsModel from "../models/products.models.js";
import { v4 as uuidv4 } from 'uuid';
import { productsDao } from "../index.js";
import { transporter } from "../../config/gmail.js";
import {cartsError} from '../../errores.js'; 

export class CartManagerDB {

    constructor(){
        this.modelCart = cartsModel;
        this.managerProduct = ProductManagerDB;
        this.modelTicket = ticketsModel;
        this.modelProduct = productsModel;
    }

    getAll = async () => {
        try {
            const carts = await this.modelCart.find().populate('products.product');
            return [carts]; 
        } catch (error) {
            return({
                status:"error",
                message:cartsError.getAll
            })
        }

    }


    getBy = async (params) => {
        try {
            let result = await this.modelCart.findOne(params);
            return result;
        } catch (error) {
            return({
                status:"error",
                message:cartsError.getBy
            })
        }

    }


    saveCart = async () => {
        try {
            let result = await this.modelCart.create({});
            return result; 
        } catch (error) {
            return({
                status:"error",
                message:cartsError.saveCart
            })
        }

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

            const product = await productsDao.getBy({_id:pid});
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
            return({
                status:"error",
                message:cartsError.addProductInCart
            })
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
        const product = await productsDao.getBy({_id:pid});
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
            return({
                status:"error",
                message:cartsError.deleteProductCart
            })
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
            return({
                status:"error",
                message:cartsError.deleteProductCartAll
            })
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
            return({
                status:"error",
                message:cartsError.editCart
            })
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
            const product = await productsDao.getBy({_id:pid});
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
            return({
                status:"error",
                message:cartsError.editProductCartQuantity
            })
        }
        
    }

    enviarEmail = async (email,params)=>{

try {
    const emailTemplate = `<div>
    <h1>Bienvenido!!</h1>
    <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
    <h2>${params.message}</h2>
    <p>Ticket N°:${params.ticket}</p>
    <h3>${params.total}</h3>
    <img width='100px' src='cid:perrito'>
    <a href="https://www.google.com/">Explorar</a>
    </div>`;

    const contenido = await transporter.sendMail({


        from: "Ecommerce CoderCommers",
        to:email,
        subject:"Registro exitoso",
        html: emailTemplate,
        attachments:[]
    })
    console.log("Contenido", contenido);
    return({
        status:"success",
        message:"envio exitoso"
    });

} catch (error) {
    return({
        status:"error",
        message:cartsError.emailTemplate
    })

}


}

    finalizePurchase = async (cid,email) =>{

        try {
            const cart = await cartsModel.findById(cid).populate('products.product');
            if (!cart) return 'Carrito no encontrado'
            let totalAmount = 0;
            const prodsActualizados = [];
            const prodsSinStock = [];
            console.log(cart.products)
            cart.products.forEach (item => {
                const product = item.product;
                if (product.stock < item.quantity) {
                    console.log(product.stock)
                    prodsSinStock.push({ productId: product._id, title: product.title });
                } else {
                    totalAmount += product.price * item.quantity;
                    prodsActualizados.push({ product, quantity: item.quantity });
                }
            });


            if (Object.entries(prodsSinStock).length === 0) {
                await Promise.all(prodsActualizados.map(({ product, quantity }) =>
                    productsModel.findByIdAndUpdate(product._id, { $inc: { stock: -quantity } })
                ));

                const ticket = new ticketsModel({
                    code:uuidv4(),
                    purchaser: email,
                    amount: totalAmount,
                });
                if(Object.entries(cart.products).length === 0) return ({
                    error:'Carrito vacío',
                    message:'No se realizó la compra, porque su carrito esta vacío'
                })
                await ticket.save();
                cart.products = [];
                await cart.save();



                const compraRealizada = ({
                    message: 'Se realizó la compra, dentro de unos minutos le enviaremos a su email la factura correspondiente', 
                    ticket: ticket._id,
                    total:`Total a pagar: US$ ${totalAmount}`
                })

                const confirmMail = this.enviarEmail(email,compraRealizada);

                return ({
                    compraRealizada,
                    confirmMail
                })
            }

             


            return ({ message: 'Hay productos sin suficiente stock', prodsSinStock });
        } catch (error) {
            return({
                status:"error",
                message:cartsError.finalizePurchase
            })
        }
    }
}


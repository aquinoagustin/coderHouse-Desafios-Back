import path from 'path';
import __dirname from '../../utils.js'
import cartModel from "../models/carts.model.js";



class CartManagerFileDB{
    constructor(pathFile){
        this.path = path.join(__dirname,`/files/${pathFile}`)
    }


    getCarts = async () => {
        try {
                const carts = await cartModel.find();
                if(carts){
                    return carts
                }
                else{
                    return [];
                }
        } catch (error) {
            console.log(error)
        }

    }



    
    addCart = async() =>{
        try {
            const carts = await this.getCarts();
            const cart = {
                "products":[]
            }
            if(carts.length === 0){
                cart.id = 1;
            }else{
                cart.id = carts[carts.length-1].id + 1;
            }
           const result = await cartModel.create(cart);
          //  await fs.promises.writeFile(this.path, JSON.stringify(carts,null,'\t'))
            return {msg:'Success',result}
        } catch (error) {
            console.log(error)
        }
    }



    addCartAndProduct = async (cid,ppid) => {
        /*
        try{
                const id = cid
                const carts = await this.getCarts();
                let cartIndex = carts.findIndex(item => item.id == id);
                let cartFind = carts.find(item => item.id == id);
                if(cartIndex !=-1){
                    const cartProduct = carts[cartIndex].products.find(item => item.product == ppid);  
                    if(cartProduct != undefined){
                        cartProduct.quantity = cartProduct.quantity + 1;
                        const result  = await cartModel.updateOne({_id:id},{$set:{products:cartProduct}});
                     //   await fs.promises.writeFile( this.path, JSON.stringify(carts, null, '\t') );
                        return {msg:'The quantity is increased to 1',result}
                    }

                    cartFind.products.push({"product":ppid,"quantity":1})
                    carts[cartIndex] = cartFind;
                    const prod = {"product":ppid,"quantity":1};
                    const resul2 = await cartModel.updateOne({_id:id},{$set:{products:cartFind}});
                 //   await fs.promises.writeFile( this.path, JSON.stringify(carts, null, '\t') );
                    return {msg:'added to cart',resul2}
                }
                return cartIndex
        }catch(err){
            console.log(err)
        }
        */
       /*
            try {
                const id = cid;
                const carts = await this.getCarts();
                const cartIndex = carts.findIndex(cart => cart.id === cid);
                if (cartIndex !== -1) {
                    const cart = carts[cartIndex];
                    if (prodExist) {
                        prodExist.quantity += 1;
                    } else {
                        console.log('false')
                        cart.products.push({ ppid, quantity: 1 });
                        console.log('leer',cart)
                    }
                    const resul = await cartModel.updateOne({_id:id},{$set:{products:carts}})
                    console.log("Producto Agregado con Éxito",resul);
                } else {
                    console.log("Carrito No encontrado");
                }
            } catch (error) {
                console.error('Error al agregar producto al carrito:', error.message);
                //throw new Error('Error al agregar producto al carrito');
            }
        }
    */

        try{
            const id = cid;
            const carts = await this.getCarts();
            let cartIndex = carts.findIndex(item => item.id == id);
            let cartFind = carts.find(item => item.id == id);
            console.log(cartIndex)
            if(cartIndex !=-1){
                const cartProduct = carts[cartIndex].products.find(item => item.product == ppid);  
                if(cartProduct != undefined){
                    cartProduct.quantity = cartProduct.quantity + 1;
                    await fs.promises.writeFile( this.path, JSON.stringify(carts, null, '\t') );
                    return {msg:'The quantity is increased to 1',carts}
                }
                cartFind.products.push({"product":ppid,"quantity":1})
                carts[cartIndex] = cartFind;
                await fs.promises.writeFile( this.path, JSON.stringify(carts, null, '\t') );
                return {msg:'added to cart',carts}
            }
            return 'cart not found'
        }catch(err){
            console.log(err)
        }
        }



    }

export {CartManagerFileDB};

import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js'
import {ProductManagerFile} from '../managers/ProductMangerFile.js';
const productManagerFile = new ProductManagerFile(path);
class CartManagerFile{
    constructor(pathFile){
        this.path = path.join(__dirname,`/files/${pathFile}`)
    }



    getCarts = async () => {
        try {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,'utf-8');
                const carts = JSON.parse(data);
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
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts,null,'\t'))
            return {msg:'Success',cart}
        } catch (error) {
            console.log(error)
        }
    }


    getCartId = async(id) =>{
        try {
            const carts = await this.getCarts();
            const cartFind = carts.find(cart => {
                return cart.id == id
            })
        
            if(!cartFind){
                return {error: 'cart not found'}
                
            }
            return cartFind

        } catch (error) {
            console.log(error)
        }

    }


    addCartAndProduct = async (cid,ppid) => {
        try{
            const id = parseInt(cid);
            const prodExist = await productManagerFile.getProductId(ppid); 
            if(prodExist){
                const carts = await this.getCarts();
                let cartIndex = carts.findIndex(item => item.id == id);
                let cartFind = carts.find(item => item.id == id);
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
            }
            return 'product not found'
        }catch(err){
            console.log(err)
        }
    }
}

export {CartManagerFile};


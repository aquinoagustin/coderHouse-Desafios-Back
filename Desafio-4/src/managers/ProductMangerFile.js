import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js'

class ProductManagerFile{
    constructor(pathFile){
        this.path = path.join(__dirname,`/files/${pathFile}`)
    }
    getProducts = async (limit) => {
        try {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,'utf-8');
                const products = JSON.parse(data);
         //       const productsA = await this.getProducts();
                if(isNaN (limit) || limit == "" || limit < 0 || limit > products.length){
                    return products
                }
                const productsFiltrados = products.slice(0,limit)
                return productsFiltrados 
        
            }
            else{
                return [];
            }

        } catch (error) {
            console.log(error)
        }

    }

    getProductId = async(id) =>{
        try {
            const products = await this.getProducts();
            const productFind = products.find(prod => {
                return prod.id == id
            })
        
            if(!productFind){
                return false
                
            }
            return productFind

        } catch (error) {
            console.log(error)
        }

    }


    createProduct = async (product) => {
        try {
            if( this.validarCampos(product.title) && this.validarCampos(product.description) && this.validarNumero(product.price) && 
            this.validarCampos(product.code) && this.validarNumero(product.stock) && product.status === true 
            && this.validarCampos(product.category)
             && Array.isArray(product.thumbnails) === true ){
                const products = await this.getProducts();
                if(products.length === 0){
                    product.id = 1;
                }else{
                    product.id = products[products.length-1].id + 1;
                }
                products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))
                return products
            }
            return 'invalid field';
        } catch (error) {
            console.log(error)
        }
        
    }

    updateProduct = async (pid,product) => {
        try{
            if( this.validarCampos(product.title) && this.validarCampos(product.description) && this.validarNumero(product.price) && 
            this.validarCampos(product.code) && this.validarNumero(product.stock) && product.status === true 
            && this.validarCampos(product.category)
             && Array.isArray(product.thumbnails) === true ){
                 const id = parseInt(pid);
                 const prods = await this.getProducts();
                 productActualizado.id = id;
                 let productIndex = prods.findIndex(item => item.id === id);
                 if(productIndex != -1){
                     prods[productIndex] = productActualizado;
                     await fs.promises.writeFile( this.path, JSON.stringify(prods, null, '\t') );
                     return productActualizado
                 }else{
                     return 'Not found'
                 }
             }
             return 'invalid field'
        }catch(err){
            console.log(err)
        }
    }


    deleteProduct = async (pid) => {
        try {
            const id = parseInt(pid);
            const prods = await this.getProducts();
            let findProduct = prods.find(item => item.id === id);
            if(findProduct){
                const productFiltrados = prods.filter(item=>item.id!= id)
                await fs.promises.writeFile(this.path,JSON.stringify(productFiltrados,null,'\t'))
                return 'Remove product'
            }else{
                return 'Product not found'
            }  
        } catch (err) {
            console.log(err)
        }
    }

    validarCampos(prod){
        if(prod === "" || prod === undefined || !isNaN(prod)){
            return false;
        }else{
            return true;
        }
    }

    validarNumero(prod){
        if(prod === undefined ){
            return false;
        }else{
            const num = parseInt(prod)
            return num;
        }
    }



}

export {ProductManagerFile};
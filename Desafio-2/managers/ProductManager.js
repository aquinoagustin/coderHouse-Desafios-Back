import fs from 'fs';

const path = './files/Products.json';

export default class ProductManager{

    constructor(){
        this.path = path;
    }

    getProducts = async () => {
        try {
            if(fs.existsSync(path)){
                const data = await fs.promises.readFile(path,'utf-8');
                const prods = JSON.parse(data);
                return prods;
            }else{
                return [];
            }  
        } catch (err) {
            console.log(err)
        }
    }

    addProduct = async (product) => {
        try {
            if( this.validarCampos(product.title) && this.validarCampos(product.description) && this.validarNumero(product.price) && 
                this.validarCampos(product.thumbnail) && this.validarCampos(product.code) && this.validarNumero(product.stock) ){
                const prods = await this.getProducts();
                if(prods.length === 0){
                    product.id = 1
                }else{
                    product.id = prods[prods.length-1].id +1;
                }
                prods.push(product);
                await fs.promises.writeFile(path,JSON.stringify(prods,null,'\t'));
                return 'Producto agregado';     
            }else{
                return 'Datos ingresados invalidos'
            }
        } catch (err) {
            console.log(err)
        }
    }
    getProductById = async (id) => {
        try {
            const prods = await this.getProducts();
            let findProduct = prods.find(item => item.id === id);
            if(findProduct){
                return findProduct;
            }else{
                return 'El producto no existe'
            }     
        } catch (err) {
            console.log(err)
        }
    }

    updateProduct = async (id,productActualizado) => {
        try{
            productActualizado.id = id;
            const prods = await this.getProducts();
            let productIndex = prods.findIndex(item => item.id === id);
            if(productIndex != -1){
                if( this.validarCampos(productActualizado.title) && this.validarCampos(productActualizado.description) && this.validarNumero(productActualizado.price) && 
                this.validarCampos(productActualizado.thumbnail) && this.validarCampos(productActualizado.code) && this.validarNumero(productActualizado.stock) ){
                    prods[productIndex] = productActualizado;
                    await fs.promises.writeFile( this.path, JSON.stringify(prods, null, '\t') );
                    return 'Producto actualizado'
                }else{
                    return 'Datos invalidos'
                }
            }else{
                return 'Producto no encontrado'
            }
        }catch(err){
            console.log(err)
        }
    }


    deleteProduct = async (id) => {
        try {
            const prods = await this.getProducts();
            let findProduct = prods.find(item => item.id === id);
            if(findProduct){
                const productFiltrados = prods.filter(item=>item.id!= id)
                await fs.promises.writeFile(this.path,JSON.stringify(productFiltrados,null,'\t'))
                return 'Producto Eliminado'
            }else{
                return 'Producto no encontrado'
            }  
        } catch (err) {
            console.log(err)
        }
    }

    //Validaciones

    validarCampos(prod){
        if(prod === "" || prod === undefined){
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
class ProductManager{

    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products;
    }

    getProductById(idProd){
        const valorItem = this.products.find(myProduct=>myProduct.idProd === idProd);
        if(valorItem){
            return valorItem;
        }else{
            return ['Not Found']
        }
    }

    addProduct(title,description,price,thumbnail,code,stock){
          if(this.validarCampos(title) && this.validarCampos(description)
          && this.validarNumero(price) && this.validarCampos(thumbnail)
          && this.validarCampos(code)  && this.validarNumero(stock)
        ){
            if(this.validarRepetidos(code)){
                let idProd = (this.getProducts()).length
                const prod = {
                    idProd:idProd++,
                    title:title,
                    description:description,
                    price:price,
                    thumbnail:thumbnail,
                    code:code,
                    stock:stock
                }
                this.products.push(prod);
                return prod;
            }else{
                return ['Codigo Repetido']
            }
        }
       

    }

    //VALIDACIONES

    validarRepetidos(item){
        const valorItem = this.products.find(myProduct=>myProduct.code === item)
        if(!valorItem){
            return true;
        }else{
            return false;
        }
    }


    validarCampos(prod){
        if(prod === "" || prod === undefined){
            return false;
        }else{
            return true;
        }
    }

    validarNumero(prod){
        if(prod === undefined || parseInt(prod) === ''){
            return false;
        }else{
            return true;
        }
    }


}

const producto = new ProductManager();
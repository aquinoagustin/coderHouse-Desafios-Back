import ProductManager from "./managers/ProductManager.js";

const manager = new ProductManager();

const env = async () =>{

    let miConsulta = await manager.getProducts(); 
    console.log(miConsulta)
    let product = {
        title:'producto prueba',
        description:'Este es un producto prueba',
        price:200,
        thumbnail:'Sin imagen',
        code:'abc123',
        stock:25
    }
    let result = await manager.addProduct(product);
    console.log(result)
   // console.log(result)
   // let result = await manager.deleteProduct(1);
   // console.log(result)
   // let result = await manager.getProductById(0);
   // console.log(result)
}
env()
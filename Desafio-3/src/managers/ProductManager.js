import fs from 'fs';
const path = './src/files/Products.json';

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
}


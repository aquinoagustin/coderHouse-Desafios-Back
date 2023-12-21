import {Router} from 'express';
import { ProductManagerFile } from '../dao/managers/ProductMangerFile.js';
const path = 'products.json';
const productManagerFile = new ProductManagerFile(path);
const router = Router();


router.get('/',async(req,res)=>{
    const prods = await productManagerFile.getProducts(); 
    res.render('home',{prods})
})


export {router as homeRouter}
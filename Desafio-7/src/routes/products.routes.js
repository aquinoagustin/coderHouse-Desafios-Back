import {Router} from "express";
import { ProductManagerDB } from "../dao/dbManagers/ProductManagerDB.js";

const router = Router();
const productManagerDB = new ProductManagerDB();

router.get('/', async (req,res)=>{
    try {

        const {limit, page, sort, category} = req.query
        const options = {
            limit: limit ?? 10,
            page: page ?? 1,
            sort: { price: sort === "asc" ? 1 : -1},
            lean: true,
        }
        const products = await productManagerDB.getProducts(options,category)
/*
        if(products.hasPrevPage){
            products.prevPage = "---LINK---"
        }
        if(products.hasNextPage){
            products.nextLink = "---LINK---"
        }
  */      
        res.send({
            status:"success",
            productos: products,
        })


    } catch (error) {
        console.log(error);
    }




})

router.get('/:pid', async (req,res)=>{
    res.send({
        status:"succes",
        msg:"Ruta GET ID PRODUCTS"
    })
})
router.post('/', async (req,res)=>{ //creo

    const product = req.body;//json con el producto
    const products = await productManagerDB.createProduct(product);

    res.send({
        status:"succes",
        msg:"Producto creado",
        productos: products
    })
})
router.put('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    res.send({
        status:"succes",
        msg:`Ruta PUT de PRODUCTS con ID: ${pid}`
    })
})
router.delete('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    res.send({
        status:"succes",
        msg:`Ruta DELETE de PRODUCTS con ID: ${pid}`
    })
})

export {router as productRouter};
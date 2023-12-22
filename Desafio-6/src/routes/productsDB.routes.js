import { Router } from "express";
import { uploader } from "../utils.js";
import {ProductManagerFileDB} from '../dao/managersDB/ProductMangerFile.js';

const path = 'products.json';
const router = Router();
const productManagerFile = new ProductManagerFileDB(path);





router.get("/", async (req,res)=>{
    let {limit} = req.query;

    const product = await productManagerFile.getProducts(limit);
    
    res.send({
        status: "success",
        message: product
    })
})


router.get("/:pid", async (req,res)=>{

      const id = req.params.pid;
      const product = await productManagerFile.getProductId(id);
    res.send({
        status: "success",
        message: product
    })
})



router.post("/", uploader.single("thumbnail") ,async (req,res)=>{

  const { title,description,price,code,stock,status,category } = req.body;
  const product = {
    title,
    description,
    price,
    code,
    stock,
    status,
    category
}
    const result = await productManagerFile.createProduct(product)
    res.send({
        status: "success",
        message: result
    })
})



router.put("/:pid", async (req,res)=>{

    const pid = req.params.pid;

    const { title,description,price,code,stock,status,category } = req.body;
    

    const updateuser = {
        title,
        description,
        price,
        code,
        stock,
        status,
        category
    }

    const result  = await productManagerFile.updateProduct(pid,updateuser);

    res.send({
        status: "success",
        message: result
    })
})




router.delete("/:pid", async (req,res)=>{

    const pid = req.params.pid;
    const result = await productManagerFile.deleteProduct(pid)

    res.send({
        status: "success",
        message: result
    })
})

export {router as productRouterDB};
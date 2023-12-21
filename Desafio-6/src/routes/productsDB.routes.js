
import { Router } from "express";
import productModel from "../dao/models/products.model.js";
import { uploader } from "../utils.js";
import {ProductManagerFileDB} from '../dao/managersDB/ProductMangerFile.js';

const path = 'products.json';
const router = Router();
const productManagerFile = new ProductManagerFileDB(path);





router.get("/", async (req,res)=>{
    let {limit} = req.query;

    const product = await productModel.find()
    
    res.send({
        status: "success",
        message: product
    })
})


router.get("/:pid", async (req,res)=>{

    const id = req.params.pid;

    const product = await productModel.find({_id:id})
    
    res.send({
        status: "success",
        message: product
    })
})



router.post("/", uploader.single("thumbnail") ,async (req,res)=>{

    const { title,description,price,code,stock,status,category } = req.body;
    
  //  const filename = req.file.filename;


    if(!title || !description || !price || !code || !stock || !status || !category ){
        return res.status(400).send({
            status: "error",
            message: "Valores incompletos"
        })
    }
    const product = {
        title,
        description,
        price,
        code,
        stock,
        status,
        category
    }

    const result = await productModel.create(product);

    res.send({
        status: "success",
        message: result
    })
})



router.put("/:pid", async (req,res)=>{

    const id = req.params.pid;

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

    const result  = await productModel.updateOne({_id:id},{$set:updateuser});

    res.send({
        status: "success",
        message: result
    })
})




router.delete("/:pid", async (req,res)=>{

    const id = req.params.pid;
    const result = await productModel.deleteOne({_id:id})

    res.send({
        status: "success",
        message: result
    })
})

export {router as productRouterDB};
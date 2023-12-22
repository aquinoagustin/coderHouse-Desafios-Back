import { Router } from "express";
import productModel from "../models/products.model.js";


import __dirname from '../../utils.js'

class ProductManagerFileDB{

    getProducts = async (limit) => {
        try {
                const products = productModel.find();
                if(products){
                    const productsFiltrados = products.find().limit(limit);
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
            const products = productModel.find();
            const productFind = products.find({_id:id})
            if(!productFind){
                return productFind 
            }
            return productFind

        } catch (error) {
            console.log(error)
        }

    }
    createProduct = async (product) => {
        try {
            const { title,description,price,code,stock,status,category } = product;
            if(!title || !description || !price || !code || !stock || !status || !category ){
                return ({
                status: "error",
                message: "Valores incompletos"
         })
    }
    const result = await productModel.create(product); 
    return result;  
        } catch (error) {
            console.log(error)
        }
        
    }

    updateProduct = async (pid,updateuser) => {
        try{
            const { title,description,price,code,stock,status,category } = updateuser;
            if(!title || !description || !price || !code || !stock || !status || !category ){
                return ({
                status: "error",
                message: "Valores incompletos"
         })
        }
    const result  = await productModel.updateOne({_id:pid},{$set:updateuser});
    return result;
    }catch(err){
            console.log(err)
        }
    }


    deleteProduct = async (pid) => {
        try {
            const result = await productModel.deleteOne({_id:pid})
            return result;
        } catch (err) {
            console.log(err)
        }
    }

}

export {ProductManagerFileDB};
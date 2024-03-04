import {productsDao} from '../dao/index.js';
import { prodsError } from '../errores.js';

class ProductController{
    static getProduct = async (req,res) =>{
            try {
                const { limit, page, sort, category, availability, query} = req.query
                const products = await productsDao.getAll(limit, page, sort, category, availability, query)
                res.send({
                    status: "success",
                    products: products
                });
            } catch (error) {
                res.status(500).send({
                    status:'error',
                    error:error.message,
                    msg:prodsError.getProduct
                })
            }
    }

    static saveProduct = async (req,res)=>{
        try {
            const product = req.body;
            const products = await productsDao.saveProduct(product);
        
            res.send({
                status:"succes",
                msg:"Producto creado",
                productos: products
            })
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:prodsError.saveProduct
            })
        }
    }

    static getBy = async (req,res)=>{
        try {
            const pid = req.params.pid;
            const result = await productsDao.getBy({_id:pid});
            res.send({
                status:"success",
                msg:`Product ${pid} `,
                result
            })    
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:prodsError.getBy
            })
        }

    }

    static updateProduct = async (req,res)=>{
        try {
            const pid = req.params.pid;
            const prod = req.body;
            const result = await productsDao.updateProduct(pid,prod)
            res.send({
                status:"success",
                msg:`Ruta PUT de PRODUCTS con ID: ${pid}`,
                result
            })   
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:prodsError.updateProduct
            })
        }

    }

    static deleteProduct = async (req,res)=>{
        try {
            const pid = req.params.pid;
            res.send({
                status:"success",
                msg:`Ruta DELETE de PRODUCTS con ID: ${pid}`
            })  
        } catch (error) {
            res.status(500).send({
                status:'error',
                error:error.message,
                msg:prodsError.deleteProduct
            })
        }

    }


}

export {ProductController};
import {ProductService} from '../service/ProductManagerDB.service.js';

class ProductController{
    static getProduct = async (req,res) =>{
            try {
                const { limit, page, sort, category, availability, query} = req.query
                const products = await ProductService.getAll(limit, page, sort, category, availability, query)
                res.send({
                    status: "success",
                    products: products
                });
            } catch (error) {
                console.error(error);
                res.status(500).send({
                    status: 'error',
                    msg: 'Internal server error',
                });
            }
    }

    static saveProduct = async (req,res)=>{
        const product = req.body;
        const products = await ProductService.saveProduct(product);
    
        res.send({
            status:"succes",
            msg:"Producto creado",
            productos: products
        })
    }

    static getBy = async (req,res)=>{
        const pid = req.params.pid;
        const result = await ProductService.getBy({_id:pid});
        res.send({
            status:"success",
            msg:`Product ${pid} `,
            result
        })
    }

    static updateProduct = async (req,res)=>{
        const pid = req.params.pid;
        const prod = req.body;
        const result = await ProductService.updateProduct(pid,prod)
        res.send({
            status:"success",
            msg:`Ruta PUT de PRODUCTS con ID: ${pid}`,
            result
        })
    }

    static deleteProduct = async (req,res)=>{
        const pid = req.params.pid;
        res.send({
            status:"success",
            msg:`Ruta DELETE de PRODUCTS con ID: ${pid}`
        })
    }


}

export {ProductController};
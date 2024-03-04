import {productsDao,cartsDao} from '../dao/index.js';



class ViewsController{
    static products = async (req, res) => {
        try {
            const { limit, page, sort, category, availability, query} = req.query
            const products = await productsDao.getAll(limit, page, sort, category, availability, query);
            res.render('products',{products: products.msg.docs,user:req.session.user}); 
        } catch (error) {
            res.status(500).send({
                error:error.message,
                msg:'No se encontraron los productos'
            })
        }

    }

    static cart = async(req,res)=>{
        try {
            const cid = req.params.cid;
            const cart = await cartsDao.getBy({_id:cid})
            res.render('cart',{cart})       
        } catch (error) {
            res.status(500).send({
                error:error.message,
                msg:'No se encontro el carrito'
            })
        }

     }

     static register = (req,res)=>{
        try {
            res.render('register');  
        } catch (error) {
            res.status(500).send({
                error:error.message,
                msg:'Error'
            })
        }

    }

    static login = (req,res)=>{
        try {
            res.render('login');
        } catch (error) {
            res.status(500).send({error:error.message})
        }

    }

}

export {ViewsController};
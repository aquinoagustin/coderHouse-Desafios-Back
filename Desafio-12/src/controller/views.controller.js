import {productsDao,cartsDao} from '../dao/index.js';



class ViewsController{
    static products = async (req, res) => {
        const { limit, page, sort, category, availability, query} = req.query
        const products = await productsDao.getAll(limit, page, sort, category, availability, query);
        res.render('products',{products: products.msg.docs,user:req.session.user});
    }

    static cart = async(req,res)=>{
        const cid = req.params.cid;
        const cart = await cartsDao.getBy({_id:cid})
        res.render('cart',{cart}) 
     }

     static register = (req,res)=>{
        res.render('register');
    }

    static login = (req,res)=>{
        res.render('login');
    }

}

export {ViewsController};
import {ProductService} from '../service/ProductManagerDB.service.js';
import {CartService} from '../service/CartManagerDB.service.js';



class ViewsController{
    static products = async (req, res) => {
        const { limit, page, sort, category, availability, query} = req.query
        const products = await ProductService.getAll(limit, page, sort, category, availability, query);
        res.render('products',{products: products.msg.docs,user:req.session.user});
    }

    static cart = async(req,res)=>{
        const cid = req.params.cid;
        const cart = await CartService.getBy({_id:cid}).lean()
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
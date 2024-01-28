import {Router} from 'express';
import ProductManagerDB  from '../dao/dbManagers/ProductManagerDB.js';
import CartManagerDB from '../dao/dbManagers/CartManagerDB.js';


const productService = new ProductManagerDB();
const cartService = new CartManagerDB();

const router = Router();

const publicAccess = (req,res,next) => {
    if(req.session.user){
        return res.redirect('/products');
    }
    next();
}

const privateAccess = (req,res,next) =>{
    if(!req.session.user){
        return res.redirect('/');
    }
    next();
}

router.get('/products',privateAccess ,async (req, res) => {
    const { limit, page, sort, category, availability, query} = req.query
    const products = await productService.getAll(limit, page, sort, category, availability, query);
    res.render('products',{products: products.msg.docs,user:req.session.user});
});



router.get('/cart/:cid',async(req,res)=>{
    const cid = req.params.cid;
    const cart = await cartService.getBy({_id:cid}).lean()
    res.render('cart',{cart}) 
 })
 

router.get('/register',publicAccess,(req,res)=>{
    res.render('register');
})

router.get('/',publicAccess,(req,res)=>{
    res.render('login');
})



export default router;
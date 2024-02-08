import {Router} from 'express';
import { ViewsController } from '../controller/views.controller.js';

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

router.get('/products',privateAccess ,ViewsController.products);



router.get('/cart/:cid',ViewsController.cart)
 

router.get('/register',publicAccess,ViewsController.register)

router.get('/',publicAccess,ViewsController.login)



export default router;
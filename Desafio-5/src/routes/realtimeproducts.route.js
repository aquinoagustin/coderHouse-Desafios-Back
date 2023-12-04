import {Router} from 'express';

const path = 'products.json';

const router = Router();


router.get('/',async(req,res)=>{
    res.render('realtimeproducts',{})
})


export {router as realtimeproductsRouter}



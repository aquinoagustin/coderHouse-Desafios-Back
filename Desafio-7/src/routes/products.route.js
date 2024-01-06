import {Router} from 'express';
import productsModel from '../dao/models/products.models.js';
const router = Router();


router.get('/products',async(req,res)=>{
    const { page } = req.query;
    const products = await productsModel.paginate(
        {},
        {},
        );
        console.log(products)
    const myProducts = products.docs;
    console.log(myProducts)
    res.render("products",{myProducts});

})

export {router as productRouterView}



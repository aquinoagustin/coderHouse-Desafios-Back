import {Router} from "express";
import { ProductController } from "../controller/products.controller.js";

const router = Router();


router.get('/',ProductController.getProduct);
  
router.post('/',ProductController.saveProduct)


router.get('/:pid', ProductController.getBy)
router.put('/:pid', ProductController.updateProduct)
router.delete('/:pid', ProductController.deleteProduct)

export {router as productRouter};
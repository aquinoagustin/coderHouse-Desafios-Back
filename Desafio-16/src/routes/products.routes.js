import {Router} from "express";
import { ProductController } from "../controller/products.controller.js";
import {checkRole} from "../middlewares/auth.js";
const router = Router();


router.get('/',ProductController.getProduct);
  
router.post('/',checkRole(['admin']),ProductController.saveProduct)


router.get('/:pid' ,ProductController.getBy)
router.put('/:pid',checkRole(['admin']), ProductController.updateProduct)
router.delete('/:pid',checkRole(['admin']) ,ProductController.deleteProduct)

export {router as productRouter};
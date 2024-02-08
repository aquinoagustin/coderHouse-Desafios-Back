import {Router} from "express";
import { CartController } from "../controller/carts.controller.js";

const router = Router();

router.get('/', CartController.getCart)

router.get('/:cid', CartController.getBy)
router.post('/', CartController.saveCart)
router.post("/:cid/product/:pid",CartController.addProductInCart )


router.put("/:cid", CartController.editCart);
router.put('/:cid/product/:pid', CartController.editProductCartQuantity)

router.delete('/:cid/product/:pid', CartController.deleteProductCart)

router.delete('/:cid', CartController.deleteProductCartAll)

export {router as cartRouter};
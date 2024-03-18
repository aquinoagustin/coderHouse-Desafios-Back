import {Router} from "express";
import { CartController } from "../controller/carts.controller.js";
import { checkRole } from "../middlewares/auth.js";

const router = Router();

router.get('/', CartController.getCart)

router.get('/:cid', CartController.getBy)
router.post('/', checkRole(['user']), CartController.saveCart)
router.post("/:cid/product/:pid",checkRole(['user']),CartController.addProductInCart )

router.post('/:cid/purchase',CartController.finalizePurchase)


router.put("/:cid", CartController.editCart);
router.put('/:cid/product/:pid', CartController.editProductCartQuantity)

router.delete('/:cid/product/:pid', CartController.deleteProductCart)

router.delete('/:cid', CartController.deleteProductCartAll)

export {router as cartRouter};
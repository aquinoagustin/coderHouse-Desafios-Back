import { Router } from "express";
import {UserController} from '../controller/users.controller.js';
const router = Router();

router.post("/premium/:uid", UserController.changeRol);

export default router;
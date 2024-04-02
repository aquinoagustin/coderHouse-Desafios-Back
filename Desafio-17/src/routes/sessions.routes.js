import { Router } from "express";
import passport from "passport";
import { SessionController } from "../controller/sessions.controller.js";

const router = Router();

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/failregister'}),
SessionController.register)

router.get('/failregister',SessionController.failRegister)

router.get('/faillogin',SessionController.failLogin)


router.get('/github',passport.authenticate('github',{scope:['user:email']}),SessionController.github)


router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}),SessionController.githubCallBack);



router.post('/login',passport.authenticate('login',{failureRedirect:'/api/session/faillogin'}),SessionController.login)

router.get("/logout", SessionController.logout);


router.post("/forgot-password",SessionController.forgotPassword);


router.post("/reset-password", SessionController.resetPassword);

export default router;

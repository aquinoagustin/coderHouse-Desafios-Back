import {Router} from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", passport.authenticate("register",{passReqToCallback:true, session:false, failureRedirect:'api/sessions/failedRegister',
failureMessage:true}), (req,res)=>{
    res.send({
        status:"success",
        message:"Usuario regsitrado",
        payload:req.user._id
    })
});

router.get("/failedRegister", (req,res)=>{
    console.log('Mal registro');
    res.send("Fallo en el registro")
})

router.post("/login", passport.authenticate("login",{failureRedirect:"api/sessions/failedLogin",
session:false}),(req,res)=>{
    const serializedUser ={
        id: req.user._id,
        name : `${req.user.first_name} ${req.user.last_name}`,
        role: req.user.rol,
        email:req.user.email
    };
    const token = jwt.sign(serializedUser, 'CodeerSecret',{expiresIn:"1h"});
    console.log(token);
    res.cookie('coderCookie',token,{maxAge:3600000}).send({
        status:"succes",
        payload:serializedUser
    })
})

router.get("/failedLogin", (req,res)=>{
    console.log('Mal Login');
    res.send("Fallo en el Login")
})

export default router;
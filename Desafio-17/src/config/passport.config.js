import passport from "passport";
import LocalStrategy  from "passport-local";
import  userModel  from "../dao/models/Users.model.js";
import {createHash, isValidPassword } from '../utils.js';

const inicializePassport = ()=>{
    //Estrategia de registro
    passport.use("register", new LocalStrategy(
        {
            usernameField:"email",
            passReqToCallback:true
        },
        async(req,username,password,done)=>{
            console.log("init")
            try {
                const {first_name} = req.body;
                const user = await userModel.findOne({email:username});
                if(user){
                    return done(null,false)
                }
                //crear el usuario
                let rol='user';
                if (username.endsWith("@coder.com")) {
                    rol = "admin";
                }
                //si no existe el usuario lo registramos
                const hashedPassword = await createHash(password);
                const newUser = {
                    name:first_name,
                    email:username,
                    password:hashedPassword,
                    rol
                };
                console.log(newUser)
                const userCreated = await userModel.create(newUser);
                return done(null,userCreated)
            } catch (error) {
                console.log(error.message);
                return done(error);
            }
        }
    ));

    //estrategia de login con passport-local
    passport.use("login", new LocalStrategy(
        {
            usernameField:"email"
        },
        async (username, password, done)=>{
            try {
                const user = await userModel.findOne({email:username});
                if(!user){
                    return done(null, false);
                }
                //usuario existe, validar contraseña
                if(!isValidPassword(password, user)) return done(null, false);
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    //serializacion y deserializacion
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    });//sesion {cookie, passport:user:id}

    passport.deserializeUser(async(id,done)=>{
        const userDB = await userModel.findById(id);
        done(null, userDB)
    });//req.user = userDB
}
export default inicializePassport;
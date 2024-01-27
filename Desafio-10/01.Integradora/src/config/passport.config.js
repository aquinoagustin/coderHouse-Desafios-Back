import passport from "passport";
import local from "passport-local";

import { createHash, isValidPassword } from "../utils.js";
import Users from "../dao/dbManager/userManager.js";

const LocalStrategy = local.Strategy;
const userService = new Users();

const initializePassport = async () => {
   passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField:'email',session:false},
   async (req,email,password,done) => {
    try {
        
        const { first_name, last_name,birthDate,dni,gender } = req.body;
        
        if(!first_name || !last_name || !dni){
            return done(null,false,{message:"Valores incompletos."})
        } 

        const exist = await userService.getBy({email:email});

        if(exist){
            return done(null,false,{message:"El usuario ya existe."})
        }

        const hashedPassword = await createHash(password);

        const newUser ={
            first_name, last_name, email, birthDate,gender, dni, 
            password:hashedPassword
        }

        let result = await userService.saveUser(newUser);

        return done(null,result)

    } catch (error) {
        done(error);
    }
   }))
   passport.use('login', new LocalStrategy({usernameField:"email", session:false},
   async (email,password,done) =>{
    try {   
        const user = await userService.getBy({email});
        
        if(!user){
            return done(null,false,{message:"El usuario no existe."})
        };
        
        const passwordValidation = await isValidPassword(user,password);
        
        if(!passwordValidation){
            return done(null,false,{message:"Password incorrecto."})
        };
        
        return done(null,user);
            
        } catch (error) {
            return done(error)
        }

   }))
   passport.serializeUser((user,done)=>{
    done(null,user._id);
   })
   passport.deserializeUser(async(id,done)=>{
    let result = await userService.findOne({_id:id});
    return done(null,result)
   })
}

export default initializePassport;
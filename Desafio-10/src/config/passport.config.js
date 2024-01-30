import passport from "passport";
import local from "passport-local";
import GitHubStrategy from 'passport-github2';
import Users from "../dao/dbManagers/userManager.js";
import {createHash, isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;
const userService = new Users();
const inicializePassport = () => {

    passport.use("register", new LocalStrategy(
        {passReqToCallback:true, usernameField:"email",session:false},
        async ( req, username, password, done ) => {
            try {
            const { first_name, last_name,email,age } = req.body;
            if(!first_name || !last_name){
                return done(null,false,{message:"Valores incompletos."})
            } 
            const user = await userService.getBy({email:username});  
            if(user){
                return done(null,false,{message:"El usuario ya existe."})
            }
            const hashedPassword = await createHash(password);
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: hashedPassword,
            }
           const result = await userService.saveUser(newUser);
            return done (null, result);

        } catch (error) {
            return done(error)
        }    

    }));

    passport.use("login", new LocalStrategy({usernameField:"email", session:false},
    async (username, password, done)=>{
        try {
            const user = await userService.getBy({email:username});
            if(!user){
                return done(null,false,{message:"El usuario no existe."})
            };
            
            const passwordValidation = await isValidPassword(user,password);
            if(!passwordValidation){
                return done(null,false,{message:"Password incorrecto."})
            };
            
                    
        return done(null,user);
            
        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id);
       })

    passport.deserializeUser(async(id,done)=>{
        let result = await userService.getBy({_id:id});
        return done(null,result)
       })

passport.use('github', new GitHubStrategy({
    clientID: "Iv1.dbc20d5b00901030",
    clientSecret:"e24cc1a7b0017a1975323cec141081508b551141",
    callbackURL:"http://localhost:8080/api/sessions/githubcallback"
}, async(accesToken, refreshToken,profile, done)=>{
    try {
        console.log(profile._json.name);
        const first_name = profile._json.name;
        let email;
        if(!profile._json.email){
            profile.username;
        }
        let user = await userService.getBy({email:profile._json.email});
        if(user){
            console.log('Usuario ya registrado');
            return done(null,false)
        }

        const newUser = {
            first_name,
            last_name: "",
            email,
            age: 18,
            password: ""
        }
        const result = await userService.saveUser(newUser);
        return done (null, result);

    } catch (error) {
        return done(error)
    }

}))





}

export default inicializePassport;
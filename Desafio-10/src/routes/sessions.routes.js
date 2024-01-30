import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/failregister'}),
async(req,res) => {
  res.send({status:'success',message:'User registrado'})
})

router.get('/failregister',async(req,res)=>{
  console.log('Fallo el registro');
  res.send({error:'Fallo en el registro'})
})

router.get('/faillogin',(req,res)=>{
  res.send({error:'fail login'})
})


router.get('/github',passport.authenticate('github',{scope:['user:email']}),async (req,res)=>{})
router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}),async (req,res)=>{
    req.session.user = req.user;
    res.redirect('/');
});



router.post('/login',passport.authenticate('login',{failureRedirect:'/api/session/faillogin'}),
  async(req,res) => {
    if(!req.user){
      return res.status(400).send({status:'error'})
    }
    req.session.user = {
      first_name:req.user.first_name,
      last_name:req.user.last_name,
      age:req.user.age,
      email:req.user.email,
    }
    res.send({status:'success',payload:req.user})
  }
  )

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({
        status: "error",
        error: "No se pudo desloguear",
      });
    }
    res.redirect("/");
  });
});

export default router;

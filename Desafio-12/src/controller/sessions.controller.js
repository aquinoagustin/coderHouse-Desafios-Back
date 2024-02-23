class SessionController{
    static register = async(req,res) => {
        res.send({status:'success',message:'User registrado'})
      }

    static failRegister = async(req,res)=>{
        console.log('Fallo el registro');
        res.send({error:'Fallo en el registro'})
    }      
    static failLogin = (req,res)=>{
        res.send({error:'fail login'})
    }
    static github = async (req,res)=>{};

    static githubCallBack = async (req,res)=>{
        req.session.user = req.user;
        res.redirect('/');
    }    
    static login =   async(req,res) => {
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
    
    static logout = (req, res) => {
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              error: "No se pudo desloguear",
            });
          }
          res.redirect("/");
        });
      }

}

export {SessionController};
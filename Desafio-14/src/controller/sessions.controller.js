class SessionController{
    static register = async(req,res) => {
      try {
        res.send({status:'success',message:'User registrado'})
      } catch (error) {
        req.logger.error('Error de conexion')
        res.status(500).send({
          error:error.message
        })
      }

      }

    static failRegister = async(req,res)=>{
        try {
          res.send({error:'Fallo en el registro'})
        } catch (error) {
          req.logger.error('Error de conexion')
          res.status(500).send({
            error:error.message
          })
        }

    }      
    static failLogin = (req,res)=>{
      try {
        res.send({error:'fail login'})
      } catch (error) {
        req.logger.error('Error de conexion')
        res.status(500).send({error:error.message})
      }

    }
    static github = async (req,res)=>{};

    static githubCallBack = async (req,res)=>{
      try {
        req.session.user = req.user;
        res.redirect('/');
      } catch (error) {
        req.logger.error('Error de conexion')
        res.status(500).send({error:error.message})
      }

    }    
    static login =   async(req,res) => {
      try {
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
      } catch (error) {
        req.logger.error('Error de conexion')
        res.status(500).send({error:error.message})
      }

      }
    
    static logout = (req, res) => {
      try {
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              error: "No se pudo desloguear",
            });
          }
          res.redirect("/");
        });
      } catch (error) {
        req.logger.error('Error de conexion')
        res.status(500).send({error:error.message})
      }


      }

}

export {SessionController};
import {usersDao} from "../dao/index.js";

class UserController{
    static changeRol = async(req,res)=>{
        try {
            const uid = req.params.uid;
            const user = await usersDao.getBy({_id:uid});
            if(user){
                const userRol = user.rol;
                if(userRol === "user"){
                    user.rol = "premium"
                } else if(userRol === "premium"){
                    user.rol = "user"
                } else {
                    return res.json({status:"error", message:"Solo puede cambiar los roles de user y premium"});
                }
                await usersDao.updateUser(uid,user);
                res.send({status:"success", message:`Rol cambiado a ${user.rol}`});
            }else{
                res.send({error:'Usuario inexistente'})
            }
        } catch (error) {
            console.log(error.message);
            res.json({status:"error", message:"hubo un error al cambiar el rol del usuario"})
        }
    }
}

export {UserController}
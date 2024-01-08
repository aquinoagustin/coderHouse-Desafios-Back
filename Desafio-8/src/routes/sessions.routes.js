import { Router } from "express";
import userModel from "../dao/models/Users.model.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  if (!(email === "adminCoder@coder.com" && password === "adminCod3r123")) {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).send({
        status: "error",
        error: "El usuario ya existe",
      });
    }
    const user = {
      first_name,
      last_name,
      email,
      age,
      password,
    };

    let result = await userModel.create(user);
    res.send({
      status: "success",
      message: "Usuario registrado",
    });
  }
  res.send({
    status: "error",
    error: "No se puede registrar ese usuario",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let state = false;


  if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
    state = true;
    req.session.user = {
      state: state,
    };
  
   return res.send({
      status: "success",
      payload: req.session.user,
      message: "Mi primer Login!!",
    });

    
  }

  const user = await userModel.findOne({ email, password });
  if (!user) {
    return res.status(400).send({
      status: "error",
      error: "Datos incorrectos",
    });
  }

  req.session.user = {
    full_name: user.first_name,
    email: user.email,
    age: user.age,
    state: state,
  };

  res.send({
    status: "success",
    payload: req.session.user,
    message: "Mi primer Login!!",
  });




});

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

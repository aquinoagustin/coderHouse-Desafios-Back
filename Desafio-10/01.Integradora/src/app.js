import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import passport from "passport";
import cookiParser from "cookie-parser";

import initializePassport from "./config/passport.config.js";
import __dirname from "./utils.js";

import viewsRouter from './routes/views.router.js';
import sessionsRouter from "./routes/sessions.router.js";

const MONGO =  "mongodb+srv://bidabehere:bidabehere@cluster0.a5dcy.mongodb.net/Coder49995";
const PORT = 8080;

const app = express();

const connection = mongoose.connect(MONGO);

/** Template engine */
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');

/***Middlewares */
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

initializePassport();
app.use(passport.initialize());
app.use(cookiParser());

app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);


const server = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})


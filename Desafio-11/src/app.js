import express from 'express';
import session from 'express-session';
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/viewsRouter.route.js';
import sessionRouter from './routes/sessions.routes.js';
import MongoStore from "connect-mongo";
import passport from 'passport';
import inicializePassport from './config/passport.config.js';
import {options} from './config/config.js';


const connection = mongoose.connect(options.mongo.url);

const PORT = options.server.port;
const app = express();




/* Secret */
app.use(session({
    store:new MongoStore({
        mongoUrl:options.mongo.url,
        ttl:3600
    }),
    secret:'CoderSecret',
    resave:false,
    saveUninitialized:false
}))

/* Passport */

inicializePassport();
app.use(passport.initialize());
app.use(passport.session())


/** Template engine */

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname + '/views');
app.set('view engine','handlebars');



/***Middlewares */

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));



//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter)
app.use('/api/sessions',sessionRouter);    


const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})
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

const MONGO = 'mongodb+srv://admin:admin@cluster0.vk2depo.mongodb.net/Coder51185';

const connection = mongoose.connect(MONGO);

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));



const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})

app.use(session({
    store:new MongoStore({
        mongoUrl:MONGO,
        ttl:3600
    }),
    secret:'CoderSecret',
    resave:false,
    saveUninitialized:false
}))

inicializePassport();
app.use(passport.initialize());
app.use(passport.session())


//Handlebars



app.set('views','./src/views')
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname + '/views');
app.set('view engine','handlebars');


//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter)
app.use('/api/sessions',sessionRouter);    


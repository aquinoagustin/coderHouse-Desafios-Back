import express from 'express';
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import mongoose from 'mongoose';
import {engine} from 'express-handlebars';
import __dirname from './utils.js';
import productsModel from './dao/models/products.models.js';
import { CartManagerDB } from './dao/dbManagers/CartManagerDB.js';

const MONGO = 'mongodb+srv://admin:admin@cluster0.vk2depo.mongodb.net/Coder51185'

const cartManagerMongo = new CartManagerDB();
const connection = mongoose.connect(MONGO);
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})




//Handlebars
app.use(express.static(__dirname + "/public"));
app.engine('handlebars',engine());
app.set('view engine','handlebars');
app.set('views','./src/views')

app.get('/products',async(req,res)=>{
    const { page } = req.query;
    const products = await productsModel.paginate(
        {},
        {},
        );
    res.render("products",{products});

})

app.get('/cart/:cid',async(req,res)=>{
    const cid = req.params.cid;
    const cart = await cartManagerMongo.getCartByID(cid)
    console.log(cart[0])
    res.render('cart',{cart}) 
})

//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);



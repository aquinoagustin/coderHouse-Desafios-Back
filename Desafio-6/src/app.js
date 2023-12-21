import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';

import  {cartRouterDB}  from './routes/cartsDB.routes.js';
import  {productRouterDB}  from './routes/productsDB.routes.js';

import {homeRouter} from './routes/home.route.js';
import {realtimeproductsRouter} from './routes/realtimeproducts.route.js';

import { ProductManagerFile } from './dao/managers/ProductMangerFile.js';

import {Server} from 'socket.io';
import mongoose from 'mongoose';
//const path = 'products.json';
//const productManagerFile = new ProductManagerFile(path);


const PORT = 8080;
let messages = []
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})




//Handlebars
app.use(express.static(__dirname + "/public"));
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')




const MONGO = "mongodb+srv://admin:admin@cluster0.vk2depo.mongodb.net/eccomerce"

const connection = mongoose.connect(MONGO);




//Rutas
//app.use("/api/products", productRouter);
//app.use("/api/carts", cartRouter);

//Rutas DB
app.use('/api/products',productRouterDB)
app.use("/api/carts",cartRouterDB)


app.use("/",homeRouter)
app.use("/realtimeproducts",realtimeproductsRouter)





//const io = new Server(httpServer);
const socketServer = new Server(httpServer);

//Socket
socketServer.on('connection',async(socket) =>{
    // Llamamos a los productos de nuestro json
    const prods = await productManagerFile.getProducts();
    
    // Mostramos el mensaje en el sv que nos llega desde el front
    socket.on('message',data =>{
        console.log(data);
    }) 


    // Pasamos los prods al front a traves de socket
    socketServer.emit('e_prods',prods)


  

})


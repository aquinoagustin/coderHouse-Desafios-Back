import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';

import  {cartRouterDB}  from './routes/cartsDB.routes.js';
import  {productRouterDB}  from './routes/productsDB.routes.js';
import  {chatRouter} from './routes/chat.route.js';

import {homeRouter} from './routes/home.route.js';
import {realtimeproductsRouter} from './routes/realtimeproducts.route.js';

//import { ProductManagerFile } from './dao/managers/ProductMangerFile.js';

import {Server} from 'socket.io';
import mongoose from 'mongoose';

import { MessageManagarFile } from './dao/managersDB/messageManagerFile.js';



//const path = 'products.json';
//const productManagerFile = new ProductManagerFile(path);
const messageManagerFile = new MessageManagarFile();


const PORT = 8080;
let messages = []
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})

const socketServer = new Server(httpServer);



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
app.use('/chat',chatRouter)





socketServer.on("connection", socket =>{

    console.log('Nuevo cliente conectado');

    socket.on("message", data =>{
        console.log(data);
    })

    socket.emit("evento_para_mi", "evento solo para el que se conecto")
    socket.broadcast.emit("evento_no_para_mi", "Hola, soy un nuevo participante")
    socketServer.emit("evento_para_todos", "Hay un nuevo participante, no olvidar las politicas...")

    socket.on("input-message", (data)=>{
        socketServer.emit("input-message", data)
    })

    socket.on("chat-message", (data)=>{

        const newMessage = {
            user: socket.id,
            message: data
        }
        messages = [...messages, newMessage];
        socketServer.emit("chat-messages-update", messages)
        messageManagerFile.createMessage(newMessage);
    })

})

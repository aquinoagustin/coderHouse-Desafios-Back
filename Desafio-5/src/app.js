import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import { ProductManagerFile } from './managers/ProductMangerFile.js';
import users from './users.js';
import {Server} from 'socket.io';
const path = 'products.json';
const productManagerFile = new ProductManagerFile(path);


const PORT = 8080;
let messages = []
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const httpServer = app.listen(PORT,() => console.log(`Servidor funcionando en el puerto:${PORT}`));


//const io = new Server(httpServer);
const socketServer = new Server(httpServer);

app.use(express.static(__dirname + "/public"));

//Handlebars
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')



app.get('/',async (req,res)=>{
    const prods = await productManagerFile.getProducts();
    res.render('home',{prods})
})

app.get('/realtimeproducts',async (req,res)=>{
    const prods = await productManagerFile.getProducts();
    res.render('realtimeproducts',{prods})
})


//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);



//Socket
socketServer.on('connection',async(socket) =>{
    const prods = await productManagerFile.getProducts();


    console.log('Nuevo cliente conectado');
    
    socket.on('message',data =>{
        console.log(data);
    }) 

 
    socket.emit('evento_para_mi','evento solo para el que se conecto')
    socket.broadcast.emit('evento_no_para_mi','Hola, soy un nuevo participante')
    socketServer.emit('evento_para_todos',prods)

    /*
    socket.on('input-message',(data)=>{
          socketServer.emit('input-message',prods)
       // socketServer.emit('input-message',data)
    })*/



/*

    socket.on('chat-message',(data)=>{
        const newMessage = {
            socketId:socket.id,
            message:data
        }
        messages = [...messages,newMessage];
        socketServer.emit('chat-messages-update',messages)

    })
*/

})
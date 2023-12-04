import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import { ProductManagerFile } from './managers/ProductMangerFile.js';
import users from './users.js';
const path = 'products.json';
const productManagerFile = new ProductManagerFile(path);


const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


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


app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})

import mongoose from "mongoose";

const collection = "Product";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price:Number,
    code:String,
    stock:Number,
    thumbnail:String
})

const productModel = mongoose.model(collection,productSchema);

export default productModel;

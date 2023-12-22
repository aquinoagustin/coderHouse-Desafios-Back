import mongoose from "mongoose";

const collection = "Cart";

const cartSchema = new mongoose.Schema({
    products:[{
        product:Number,
        quantity:Number
    }]
})

const cartModel = mongoose.model(collection,cartSchema);

export default cartModel;

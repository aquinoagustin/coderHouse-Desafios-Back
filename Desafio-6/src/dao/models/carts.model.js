import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product: [
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products',
                required:true
            },
            quantity:{
                type:Number,
                require:true,
            }
        }
    ]
})

const cartsModel = mongoose.model('cart',cartSchema);

export default cartsModel;
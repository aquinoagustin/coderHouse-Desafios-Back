import mongoose from "mongoose";

 const collection = 'Users';

 const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    age:Number,
    password:String,
    cart:{
      type:[
          {
              type:mongoose.SchemaTypes.ObjectId,
              ref:'cart'
          }
      ],
      default:[]
  },
    rol:{
      type:String,
      enum:["user","admin","premium"],
      default:"user"
  },
  owner:{
    type:String
  }
 })

 const userModel = mongoose.model(collection,schema);

 export default userModel;
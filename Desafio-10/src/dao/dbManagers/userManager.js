import userModel from "../models/Users.model.js";


export default class Users {
    getAll = async () => {
        let users = await userModel.find().lean().populate('cart');
        return users;
    }
    saveUser = async (user) => {
        let result = await userModel.create(user);
        return result;
    }
    getBy = async (params) => {
        let result = await userModel.findOne(params).populate('cart');
        return result;
    }
    updateUser = async (id,user) => {
        delete user._id;
        let result = await userModel.updateOne({_id:id},{$set:user})
        return result
    }
}
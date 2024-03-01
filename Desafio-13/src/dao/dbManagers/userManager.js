import userModel from "../models/Users.model.js";
import {CartManagerDB} from './CartManagerDB.js';

export class Users {

    constructor(){
        this.modelUser = userModel;
        this.managerCart = CartManagerDB;
    }

    getAll = async () => {
        let users = await this.modelUser.find().lean().populate('cart');
        return users;
    }
    saveUser = async (user) => {
        const cart = await this.managerCart.saveCart();
        user.cart = cart;
        let result = await this.modelUser.create(user);
        return result;
    }
    getBy = async (params) => {
        let result = await this.modelUser.findOne(params).populate('cart');
        return result;
    }
    updateUser = async (id,user) => {
        delete user._id;
        let result = await this.modelUser.updateOne({_id:id},{$set:user})
        return result
    }
}
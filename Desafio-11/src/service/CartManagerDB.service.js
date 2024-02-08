import {CartManagerDB} from '../persistence/CartManagerDB.js';

const cartManagerDB = new CartManagerDB();

class CartService{
    static getAll = async () => {
        const cart = cartManagerDB.getAll();
        return cart;
    }

    static getBy = async(params) => {
        const cart = cartManagerDB.getBy(params);
        return cart;
    }

    static saveCart = async() => {
        const result = cartManagerDB.saveCart();
        return result;
    }

    static addProductInCart = async(cid, pid, quantity) => {
        const result = cartManagerDB.addProductInCart(cid, pid, quantity);
        return result;
    }

    static deleteProductCart = async (cid,pid) => {
        const result = cartManagerDB.deleteProductCart(cid,pid);
        return result;
    }

    static deleteProductCartAll = async (cid) => {
        const result = cartManagerDB.deleteProductCartAll(cid);
        return result;
    }

    static editCart = async(cid, updatedProducts) =>{
        const result = cartManagerDB.editCart(cid,updatedProducts);
        return result;
    }

    static editProductCartQuantity = async(cid,pid,quantity) => {
        const result = cartManagerDB.editProductCartQuantity(cid,pid,quantity);
        return result;
    }
}

export {CartService};
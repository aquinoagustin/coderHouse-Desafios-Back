import {ProductManagerDB} from '../persistence/ProductManagerDB.js';

const productManagerDB = new ProductManagerDB();

class ProductService{
    static getAll = async (limit, page, sort, category, availability, query) => {
        const cart = productManagerDB.getAll(limit, page, sort, category, availability, query);
        return cart;
    }

    static getBy = async(params) => {
        const cart = productManagerDB.getBy(params);
        return cart;
    }

    static saveProduct = async(prod) => {
        const result = productManagerDB.saveProduct(prod);
        return result;
    }

    static updateProduct = async(id,prod) => {
        const result = productManagerDB.updateProduct(id,prod);
        return result;
    }
}

export {ProductService};
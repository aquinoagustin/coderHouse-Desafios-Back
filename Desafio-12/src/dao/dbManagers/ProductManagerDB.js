import productsModel from "../models/products.models.js";

export class ProductManagerDB {

    constructor(){
        this.model = productsModel;
    }

  saveProduct = async (prod) => {
    let result = await this.model.create(prod);
    return result;
}


  getAll = async (limit, page, sort, category, availability, query) => {
    const filter = {};
    if (category) {
        filter.category = category;
    }
    if (availability) {
        filter.stock = { $gt: 0 };
    }

    if (query) {
        filter.$or = [
            { title: { $regex: new RegExp(query, 'i') } },
        ];
    }

    const options = {
        limit: limit ?? 5,
        page: page ?? 1,
        sort: { price: sort === "asc" ? 1 : -1},
        lean: true
    }
    const products = await this.model.paginate(filter, options);
    const queryy = {
        limit,
        page: products.hasPrevPage && products.prevPage,
        sort,
        category,
        availability,
        query
    };
    Object.keys(queryy).forEach(key => queryy[key] === undefined && delete queryy[key]);
    let prevLink = null
    let nextLink = null
    if (products.hasPrevPage) {
        prevLink = `/api/products?${new URLSearchParams(queryy).toString()}`;
    }

    if (products.hasNextPage) {
      queryy.page = products.nextPage;
        nextLink = `/api/products?${new URLSearchParams(queryy).toString()}`;
    }

    products.prevLink = prevLink
    products.nextLink = nextLink
    return {
        status: "success",
        msg: products
    }
};

getBy = async (params) => {
  let result = await this.model.findOne(params);
  return result;
}

updateProduct = async (id,prod) => {
    delete prod._id;
    let result = await this.model.updateOne({_id:id},{$set:prod})
    return result
}

}


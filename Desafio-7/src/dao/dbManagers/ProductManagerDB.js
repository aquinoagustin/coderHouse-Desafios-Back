import productsModel from "../models/products.models.js";

class ProductManagerDB {
  createProduct = async (prod) => {
    try {
      const product = await productsModel.create(prod);
      return {
        status: "success",
        msg: product,
      };
    } catch (error) {
      console.log(error);
    }
  };

  getProducts = async (options, category) => {
    try {
      const products = await productsModel.paginate(
        {},
        {
          limit: options.limit,
          page: options.page,
          sort: options.sort,
          lean: options.lean,
        }
      );
      return {
        products,
      };
    } catch (error) {
      console.log(error);
    }
  };
  getProductByID = async (pid) => {
    try {
      const product = await productsModel.findOne({ _id_id });
      return {
        status: "success",
        msg: product,
      };
    } catch (error) {
      console.log(error);
    }
  };
}

export { ProductManagerDB };

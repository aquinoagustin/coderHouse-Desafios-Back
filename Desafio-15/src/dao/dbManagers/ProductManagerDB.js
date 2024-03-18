import productsModel from "../models/products.models.js";
import userModel from "../models/Users.model.js";
import { prodsError } from "../../errores.js";
export class ProductManagerDB {
  constructor() {
    this.model = productsModel;
    this.userModel = userModel;
  }

  saveProduct = async (prod) => {
    try {
      let result = await this.model.create(prod);
      return result;
    } catch (error) {
      return {
        status: "error",
        message: prodsError.saveProduct,
      };
    }
  };

  getAll = async (limit, page, sort, category, availability, query) => {
    try {
      const filter = {};
      if (category) {
        filter.category = category;
      }
      if (availability) {
        filter.stock = { $gt: 0 };
      }

      if (query) {
        filter.$or = [{ title: { $regex: new RegExp(query, "i") } }];
      }

      const options = {
        limit: limit ?? 5,
        page: page ?? 1,
        sort: { price: sort === "asc" ? 1 : -1 },
        lean: true,
      };
      const products = await this.model.paginate(filter, options);
      const queryy = {
        limit,
        page: products.hasPrevPage && products.prevPage,
        sort,
        category,
        availability,
        query,
      };
      Object.keys(queryy).forEach(
        (key) => queryy[key] === undefined && delete queryy[key]
      );
      let prevLink = null;
      let nextLink = null;
      if (products.hasPrevPage) {
        prevLink = `/api/products?${new URLSearchParams(queryy).toString()}`;
      }

      if (products.hasNextPage) {
        queryy.page = products.nextPage;
        nextLink = `/api/products?${new URLSearchParams(queryy).toString()}`;
      }

      products.prevLink = prevLink;
      products.nextLink = nextLink;
      return {
        status: "success",
        msg: products,
      };
    } catch (error) {
      return {
        status: "error",
        message: prodsError.getAll,
      };
    }
  };

  getBy = async (params) => {
    try {
      let result = await this.model.findOne(params);
      return result;
    } catch (error) {
      return {
        status: "error",
        message: prodsError.getBy,
      };
    }
  };

  updateProduct = async (id, prod) => {
    try {
      delete prod._id;
      const product = await this.getBy({ _id: id });
      if (!product) {
        return { status: "error", message: "El producto no existe" };
      }
      const user = await this.userModel.findOne({ _id: id });
      if (user.rol === "admin") {
        let prodModify = await this.model.updateOne({_id:id},{$set:prod})
        if (!prodModify)
          return {
            status: "error",
            message: "El producto no se pudo modificar",
          };
        return { status: "success", message: "Producto modificado" };
      }
      if (user._id === product.owner) {
        let prodModify = await this.model.updateOne({_id:id},{$set:prod})
        if (!prodModify)
          return {
            status: "error",
            message: "El producto no se pudo modificar",
          };
      }
      return { status: "success", message: "Usted no cuenta con suficientes permisos" };

    } catch (error) {
      return {
        status: "error",
        message: prodsError.updateProduct,
      };
    }
  };
  deleteProduct = async (pid) => {
    try {
      const prod = await this.getBy({ _id: pid });
      if (!prod) {
        return { status: "error", message: "El producto no existe" };
      }
      const user = await this.userModel.findOne({ _id: pid });
      if (user.rol === "admin") {
        const prodDelete = await prod.deleteOne({ _id: pid });
        if (!prodDelete)
          return {
            status: "error",
            message: "El producto no se pudo eliminar",
          };
        return { status: "success", message: "Producto eliminado" };
      }
      if (user._id === prod.owner) {
        const prodDelete = await prod.deleteOne({ _id: pid });
        if (!prodDelete)
          return {
            status: "error",
            message: "El producto no se pudo eliminar",
          };
      }
      return { status: "success", message: "Usted no cuenta con suficientes permisos" };
    } catch (error) {
      return { status: "error", message: error };
    }
  };
}

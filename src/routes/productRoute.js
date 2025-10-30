import express from "express";
import {
  addProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductsHandler,
} from "../handler/productHandler.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProductsHandler);
productRouter.get("/products/:id", getProductByIdHandler);
productRouter.post("/products", addProductHandler);
productRouter.put("/products/:id", updateProductsHandler);
productRouter.delete("/products/:id", deleteProductHandler);

export default productRouter;
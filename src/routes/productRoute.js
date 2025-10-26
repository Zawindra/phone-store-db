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
productRouter.get("/Products/:id", getProductByIdHandler);
productRouter.post("/Products", addProductHandler);
productRouter.put("/Products/:id", updateProductsHandler);
productRouter.delete("/Products/:id", deleteProductHandler);

export default productRouter;
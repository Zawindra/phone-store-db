import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validation/productValidation.js";
import validate from "../validation/validate.js";

// GET ALL
export const getAllProduct = async () => {
  const [products] = await pool.query("SELECT * FROM products");
  return products;
};

// GET BY ID
export const getProductById = async (id) => {
  const [products] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  if (products.length === 0) {
    throw new ResponseError(404, "Product not found");
  }
  return products[0];
};

// CREATE
export const createProduct = async (req) => {
  const data = validate(createProductSchema, req);
  const { user_id, name, description, price, stock } = data;

  const [result] = await pool.query(
    `INSERT INTO products (user_id, name, description, price, stock)
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, name, description, price, stock],
  );

  return {
    id: result.insertId,
    user_id,
    name,
    description,
    price,
    stock,
  };
};

// UPDATE
export const updateProductById = async (id, req) => {
  const data = validate(updateProductSchema, req);
  const { user_id, name, description, price, stock } = data;

  const [result] = await pool.query(
    "UPDATE products SET user_id=?, name=?, description=?, price=?, stock=? WHERE id=?",
    [user_id, name, description, price, stock, id],
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "Product not found");
  }

  return {
    id,
    user_id,
    name,
    description,
    price,
    stock,
  };
};

// DELETE
export const deleteProductById = async (id) => {
  const [result] = await pool.query("DELETE FROM products WHERE id=?", [id]);

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "Product not found");
  }
};

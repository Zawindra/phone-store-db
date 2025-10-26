import { pool } from "../config/db.js";

export const getAllProductsHandler = async (req, res) => {
  try {
    const [products] = await pool.query(
      "SELECT id, user_id, name, description, price, stock FROM products"
    );

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const [products] = await pool.query(
      "SELECT id, user_id, name, description, price, stock FROM products WHERE id=?",
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: products[0],
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addProductHandler = async (req, res) => {
  const { user_id, name, description, price, stock } = req.body;

  if (!user_id) {
    return res.status(400).json({
      status: "fail",
      message: "user_id is required",
    });
  }

  if (!name || !name.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "name is required",
    });
  }

  if (name.includes(" ")) {
    return res.status(400).json({
      status: "fail",
      message: "username tidak boleh mengandung spasi",
    });
  }

  if (!description || !description.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "description is required",
    });
  }

  if (!price) {
    return res.status(400).json({
      status: "fail",
      message: "price is required",
    });
  }

  if (!stock) {
    return res.status(400).json({
      status: "fail",
      message: "stock is required",
    });
  }

  try {
    const [products] = await pool.query(
      "INSERT INTO products (user_id, name, description, price, stock) VALUES (?,?,?,?,?)",
      [user_id, name, description, price, stock]
    );

    const newProduct = {
      id: products.insertId,
      user_id,
      name,
      description,
      price,
      stock,
    };

    res.status(201).json({
      status: "success",
      message: "user created success",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProductsHandler = async (req, res) => {
  const { id } = req.params;
  const { user_id, name, description, price, stock } = req.body;
  try {
    await pool.query(
      "UPDATE products SET user_id=?, name=?, description=?, price=?, stock=? WHERE id=?",
      [user_id, name, description, price, stock, id]
    );

    const productUpdate = await pool.query(
      "SELECT id, user_id, name, description, price, stock FROM products WHERE id=?",
      [id]
    );

    res.status(201).json({
      status: "success",
      message: "user update success",
      data: productUpdate[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user",
      error: error.message,
    });
  }
};

export const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [deleteProduct] = await pool.query(
      "DELETE FROM products WHERE id=?",
      [id]
    );

    if (deleteProduct.affectedRows === 0) {
      res.status(404).json({
        status: "fail",
        message: "product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "product was deleted",
    });
  } catch (error) {
    console.error(error);
  }
};
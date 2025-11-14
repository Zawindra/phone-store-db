import bcrypt from "bcrypt"; // Tambah import bcrypt
import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import validate from "../validations/validate.js";
import { createUserSchema, updateUserSchema } from "../validations/userValidation.js";

/* ============================
   GET ALL USERS
============================ */
export const getAllUsersHandler = async () => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users"
  );

  return users;
};

/* ============================
   GET USER BY ID
============================ */
export const getUserByIdHandler = async (id) => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
    [id]
  );


  if (users.length === 0) {
    throw new ResponseError(404, "user not found");
  }

  return users[0];

};

/* ============================
   CREATE USER (UPDATED)
============================ */
export const createUsersHandler = async (request) => {
  const validated = validate(createUserSchema, request);
  const { fullname, username, email, password, role } = validated;

  // hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(password, 10);

  const [users] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role) VALUES (?,?,?,?,?)",
    [fullname, username, email, hashedPassword, role]
  );

  // objek data user tanpa password
  const newUser = {
    id: users.insertId,
    fullname,
    username,
    email,
    role,
  };

  return newUser;
};

/* (duplikasi, tetap aku samakan tapi lebih baik kamu hapus salah satu) */
export const createdUser = async (request) => {
  const validated = validate(createUserSchema, request);
  const { fullname, username, email, password, role } = validated;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [users] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role) VALUES (?,?,?,?,?)",
    [fullname, username, email, hashedPassword, role]
  );

  const newUser = {
    id: users.insertId,
    fullname,
    username,
    email,
    role,
  };

  return newUser;
};

/* ============================
   UPDATE USER (UPDATED)
============================ */
export const updateUsersHandler = async (id, request) => {
  const validated = validate(updateUserSchema, request);

  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = validated;

  // hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(password, 10);

  // update data
  const [result] = await pool.query(
    `UPDATE users 
     SET fullname=?, username=?, email=?, password=?, role=?, address=?, phone_number=?, age=? 
     WHERE id=?`,
    [
      fullname,
      username,
      email,
      hashedPassword,
      role,
      address,
      phone_number,
      age,
      id,
    ]
  );

  // jika tidak ada row yg terupdate
  if (result.affectedRows === 0) {
    throw new ResponseError(404, "user not found");
  }

  // ambil data terbaru
  const [userUpdate] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
    [id]
  );

  return userUpdate[0];
};

/* ============================
   DELETE USER
============================ */
export const deleteUsersHandler = async (id) => {
  const [deleteUsers] = await pool.query("DELETE FROM users WHERE id=?", [id]);

  if (deleteUsers.affectedRows === 0) {
    throw new ResponseError(404, "user not found");
  }
};

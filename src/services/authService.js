import { pool } from "../config/db.js";
import { registerSchema, loginSchema } from "../validations/authValidation.js";
import validate from "../validations/validate.js";
import bcrypt from "bcrypt";

// ===================== REGISTER ======================
export const register = async (request) => {
  const validated = validate(registerSchema, request);

  const {
    fullName,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = validated;

  // Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(password, 10);

  const [users] = await pool.query(
    `INSERT INTO users 
      (fullname, username, email, password, role, address, phone_number, age) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      fullName,
      username,
      email,
      hashedPassword,
      role,
      address,
      phone_number,
      age,
    ]
  );

  // Data user tanpa password
  const newUser = {
    id: users.insertId,
    fullname: fullName,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  };

  return newUser;
};

// ===================== LOGIN ======================
export const login = async (request) => {
  // Validasi input sesuai loginSchema
  const { email, password } = validate(loginSchema, request);

  // Cek email di database
  const [rows] = await pool.query(
    `SELECT id, fullname, username, email, password, role, address, phone_number, age 
     FROM users 
     WHERE email = ? 
     LIMIT 1`,
    [email]
  );

  if (rows.length === 0) {
    // email tidak ditemukan → samakan pesan agar tidak membocorkan info
    throw new ResponseError(401, "email atau password salah");
  }

  const user = rows[0];

  // Bandingkan password plain dengan hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ResponseError(401, "email atau password salah");
  }

  // Kembalikan user tanpa password
  return {
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    role: user.role,
    address: user.address,
    phone_number: user.phone_number,
    age: user.age,
  };
};

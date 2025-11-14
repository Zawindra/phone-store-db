import z from "zod";

// CREATE USER
export const createUserSchema = z.object({
  fullname: z.string().min(3, "fullname must be at least 3 characters"),
  username: z.string().min(3, "username must be at least 3 characters"),
  email: z.string().email("invalid email address"),
  password: z.string().min(6, "password must be at least 6 characters"),
  role: z.enum(["admin", "user"], "invalid role"),
  address: z.string().optional(),
  phone_number: z.string().optional(),
  age: z.number().optional(),
});

// UPDATE USER
export const updateUserSchema = z.object({
  fullname: z.string().min(3, "fullname minimal 3 karakter").optional(),
  username: z.string().min(3, "username minimal 3 karakter").optional(),
  email: z.string().email("email tidak valid").optional(),
  password: z.string().min(8, "password minimal 8 karakter").optional(),
  role: z.enum(["admin", "user"]).optional(),
  address: z.string().optional(),
  phone_number: z.string().optional(),
  age: z.number().optional(),
});

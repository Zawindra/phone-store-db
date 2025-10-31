import z from "zod";

export const createUserShcema = z.object({
    fullname: z.string().min(3, "fullname must be at least 3 characters" ),
    username: z.string().min(3, "username must be at least 3 characters" ),
    email: z.email("invalid email address"),
    password: z.string().min(6, "password must be at least 6 characters" ),
    role: z.enum(["admin", "user"], "invalid role"),
});

export const updateUserSchema = z.object({
  fullname: z.string().min(3, "fullname minimal 3 karakter").optional(),
  username: z.string().min(3, "username minimal 3 karakter").optional(),
  email: z.string().email("email tidak valid").optional(),
  password: z.string().min(8, "password minimal 8 karakter").optional(),
  role: z
    .enum(["admin", "user"], { message: "role harus 'admin' atau 'user'" })
    .optional(),
  address: z.string({ invalid_type_error: "address tidak valid" }).optional(),
  phone_number: z
    .string({ invalid_type_error: "phone_number tidak valid" })
    .optional(),
  age: z.string({ invalid_type_error: "umur tidak valid" }).optional(),
});
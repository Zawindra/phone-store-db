import z from "zod";

export const createUserShcema = z.object({
    fullname: z.string().min(3, "fullname must be at least 3 characters" ),
    username: z.string().min(3, "username must be at least 3 characters" ),
    email: z.email("invalid email address"),
    password: z.string().min(6, "password must be at least 6 characters" ),
    role: z.enum(["admin", "user"], "invalid role"),
})
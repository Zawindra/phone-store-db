import z from "zod";

export const createProductSchema = z.object({
  user_id: z.number({ message: "User id harus berupa number" }),
  name: z.string({ message: "Name harus berupa string" }).min(3, "Name minimal 3 karakter"),
  description: z.string({ message: "Description harus berupa string" }).min(3, "Description minimal 3 karakter"),
  price: z.number({ message: "Price harus berupa number" }),
  stock: z.number({ message: "Stock harus berupa number" }),
});

export const updateProductSchema = createProductSchema.partial();

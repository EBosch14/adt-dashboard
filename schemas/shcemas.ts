import z from "zod";

export const FormSchema = z.object({
  name: z.string().min(1).max(25).trim(),
  images: z
    .array(
      z
        .object({
          url: z.string().trim(),
        })
        .strict()
    )
    .min(1),
  price: z.coerce.number().min(1),
  stock: z.coerce.number().int().nonnegative(),
  description: z.string().min(10).max(5000).trim(),
  category_id: z.string().min(1).trim(),
  provider_id: z.string().min(1).trim(),
  size_id: z.string().min(1).trim(),
  is_archived: z.boolean().default(false).optional(),
  brand: z.string().min(1).trim(),
  model: z.string().min(1).trim(),
});

import z, { array, int } from "zod";

export const commonStringValidation = z.string().trim().min(1).max(100);

const basicStringArraySchema = z.array(commonStringValidation).max(10);
export const categoryRequestSchema = z.object({
  name: commonStringValidation,
  slug: commonStringValidation,
});

export const brandRequestSchema = z.object({
  name: commonStringValidation,
  slug: commonStringValidation,
  logoUrl: z.url().optional(),
});

export const updateCategorySchema = categoryRequestSchema.extend({});
export const updateBrandSchema = brandRequestSchema.extend({});

export const idSchemaInUrl = z.coerce
  .number({ error: "ID must be a number" })
  .positive({ error: "ID must be positive" })
  .int({ error: "ID must be an integer" });

export const idSchema = z.number().int().positive();

export const imageSchema = z.object({
  url: commonStringValidation,
  text: commonStringValidation,
});

export type CategoryRequest = z.infer<typeof categoryRequestSchema>;
export type BrandRequest = z.infer<typeof brandRequestSchema>;
export type CategoryUpdate = z.infer<typeof updateCategorySchema>;
export type BrandUpdate = z.infer<typeof updateBrandSchema>;

export const productCreateSchema = z.object({
  name: commonStringValidation,
  slug: commonStringValidation,
  description: z.string().trim().min(1).max(500),
  brandId: idSchema,
  categoryId: idSchema,
  skinTypes: basicStringArraySchema,
  concerns: basicStringArraySchema,
  images: z.array(imageSchema),
});

export type CreateProduct = z.infer<typeof productCreateSchema>;

export const moneySchema = z.coerce
  .number()
  .min(0.01)
  .max(999_999.99)
  .multipleOf(0.01, { error: "Price must be up to to decimal places!" });

export const createProductVariantSchema = z
  .object({
    label: commonStringValidation,
    mrp: moneySchema,
    price: moneySchema,
    code: commonStringValidation,
    images: z.array(imageSchema),
    stock: z.int().min(0),
  })
  .refine(
    (obj) => {
      return obj.mrp >= obj.price;
    },
    { error: "mrp must be greater or equal to price" },
  );

export type CreateProductVariant = z.infer<typeof createProductVariantSchema>;

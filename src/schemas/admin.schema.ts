import z from "zod";

const commonStringValidation = z.string().trim().min(1).max(100);

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
export const idSchema = z.coerce
  .number({ error: "ID must be a number" })
  .positive({ error: "ID must be positive" })
  .int({ error: "ID must be an integer" });

export type CategoryRequest = z.infer<typeof categoryRequestSchema>;
export type BrandRequest = z.infer<typeof brandRequestSchema>;
export type CategoryUpdate = z.infer<typeof updateCategorySchema>;
export type BrandUpdate = z.infer<typeof updateBrandSchema>;

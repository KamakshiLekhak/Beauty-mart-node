import z from "zod";
import {
  commonStringValidation,
  idSchema,
  idSchemaInUrl,
  moneySchema,
} from "./admin.schema.ts";

export const productFilterSchema = z
  .object({
    id : idSchemaInUrl.optional(),
    category: idSchemaInUrl.optional(),
    categorySlug: commonStringValidation.optional(),
    brand: idSchemaInUrl.optional(),
    skinType: commonStringValidation.optional(),
    concern: commonStringValidation.optional(),
    minPrice: moneySchema.optional(),
    maxPrice: moneySchema.optional(),
    sort: z
      .enum(["newest", "price_asc", "price_desc", "rating"], {
        error: "sort parm must have fixed values",
      })
      .default("newest"),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(20).default(10),
  })
  .refine(
    (obj) => {
      if (obj.minPrice && obj.maxPrice) {
        return obj.minPrice < obj.maxPrice;
      }
      return true;
    },
    { error: "minPrice must be smaller than maxPrice" },
  );

export type ProductFilter = z.infer<typeof productFilterSchema>;

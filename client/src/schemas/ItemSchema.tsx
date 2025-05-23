import { z } from "zod";

const ItemSchema = z.object({
  itemName: z.string().min(1, { message: "FirstName is required" }),
  image: z
  .any()
  .refine((files) => files && files.length > 0, {
    message: "יש להעלות תמונה",
  }),
  session: z.string().optional().nullable(),

  style: z.string(),
});

export default ItemSchema;

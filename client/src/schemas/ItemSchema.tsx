import { z } from "zod";

const ItemSchema = z.object({
  itemName: z.string().min(1, { message: "Item name is required" }),
  image: z.any().refine((files) => files && files.length > 0, { message: "A picture must be uploaded.",}),
  session: z.enum(["קיץ", "כללי", "חורף"], {
  required_error:"You must select a season."}),
  style: z.string().nonempty("Choose one style option"),
});

export default ItemSchema;

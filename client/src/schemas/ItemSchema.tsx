import { z } from "zod";

const ItemSchema = z.object({
  itemName: z.string().min(1, { message: "FirstName is required" }),
//   url: z.string(),
  categoryName:z.string(),
//   season:z.string(),
//   categoryId:z.number(),
//   inUse:z.boolean(),
//   countWear:z.number(),
//   style:z.string(),
});

export default ItemSchema;

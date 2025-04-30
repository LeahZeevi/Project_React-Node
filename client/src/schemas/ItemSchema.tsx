import {z} from "zod"

const ItemSchema=z.object({
    name:z.string().min(1,{message:"FirstName is "}),
    age: z.number().min(0, {message: "min is 0"}),
   

})
export default ItemSchema
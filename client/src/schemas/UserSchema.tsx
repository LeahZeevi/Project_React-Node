
// import {z} from "zod"

//  const UserSchema=z.object({
//     userName:z.string().min(1,{message:"FirstName is "}),
//     city: z.string().min({message: "min is 0"}),
//     email: z.string().min(0, {message: "min is 0"}),
//     Password: z.string().min(0, {message: "min is 0"}),

// })
// export default UserSchema

import { z } from "zod";

const UserSchema = z.object({
    userName: z.string().min(1, { message: "FirstName is required" }),
    city: z.string().min(1, { message: "City is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }), // לדוגמה דרישת מינימום לארבעה תווים
});

export default UserSchema;
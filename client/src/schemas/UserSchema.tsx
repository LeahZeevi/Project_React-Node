import { z } from "zod";
import MyWardrobe from "../pages/MyWardrobe";
import Item from "../interfaces/Items";

export const RegisterUserSchema = z.object({
    userName: z.string().min(1, { message: "FirstName is required" }),
    city: z.string().min(1, { message: "City is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }), 
  
});

export const LoginUserSchema = z.object({
    userName: z.string().min(1, { message: "FirstName is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }), 
});


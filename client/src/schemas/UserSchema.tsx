import { z } from "zod";

export const RegisterUserSchema = z.object({
  userName: z.string().min(2,"Username must contain at least 2 characters" ),
  city: z.string().min(1, "You have to choose a city"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
})

export const UserSchema = z.object({
    userName: z.string().min(1, { message: "FirstName is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }), 
});


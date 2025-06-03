import { z } from "zod";

export const RegisterUserSchema = z.object({
  userName: z.string().min(2, "שם משתמש חייב להכיל לפחות 2 תווים"),
  city: z.string().min(1, "יש לבחור עיר"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
})

export const UserSchema = z.object({
    userName: z.string().min(1, { message: "FirstName is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }), 
});


import { JSX } from "react/jsx-runtime";
import Item from "./Items";


export interface Users{

    _id:string
    userName:String,
    city:String,
    email:String,
    password:String,
    myWardrobe:[Item]
}

export interface  LoginedUser  {
    userName: string;
    password: string;
 };
 export interface TokenCurrentUser{
    aaccessToken:string
}


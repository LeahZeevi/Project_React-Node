import Item from "./Items";


export interface Users{
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


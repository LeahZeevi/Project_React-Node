
export interface Users{
    _id:string
    userName:String,
    city:String,
    email:String,
    password:String,
}

export interface  LoginedUser  {
    userName: string;
    password: string;
 };
 export interface TokenCurrentUser{
    aaccessToken:string
}


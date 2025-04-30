

export interface Users{
    userName:String,
    t:String,
    email:String,
    password:String,
  
}

export interface  PartialUser  {
    userName: string;
    password: string;
 };
 export interface ResponsUser{
    _id:string,
    userName:String,
    city:string,
    email:string,
    password:string,
    aaccessToken:string
  
}


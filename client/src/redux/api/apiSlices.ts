import { createApi, fetchBaseQuery,  } from "@reduxjs/toolkit/query/react";
import { use } from "react";
import { useCookies } from "react-cookie";
import { Users } from "../../interfaces/Users";
// import jwtDecode from "jwt-decode";

const apiSlice=createApi({
  baseQuery:fetchBaseQuery({
      baseUrl:'http://localhost:5000',
    prepareHeaders: (headers) => {
      const token = getCookie('token');
      console.log('Token from cookie:', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  
  reducerPath:'api',
  tagTypes:["Items","Users"],


    endpoints: () => ({})
})
export default apiSlice;


const getCookie=(name: string): string | null=> {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}
// Removed duplicate getCookie function declaration.


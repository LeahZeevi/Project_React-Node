import { createApi, fetchBaseQuery,  } from "@reduxjs/toolkit/query/react";
{console.log('apiSlice')};

const apiSlice=createApi({

  baseQuery:fetchBaseQuery({
      baseUrl:'http://localhost:3000',
    prepareHeaders: (headers) => {
      const token = getCookie('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  
  reducerPath:'api',
  tagTypes:["Items","Users","History","Wearning"],
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


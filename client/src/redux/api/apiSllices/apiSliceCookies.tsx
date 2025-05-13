
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const apiSliceCookies = createApi({
  reducerPath: "cookies",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}), 
});

export default apiSliceCookies;
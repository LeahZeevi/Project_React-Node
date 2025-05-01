import apiSlice from "../apiSlices";
import {Users,LoginedUser} from "../../../interfaces/Users";

const usersApiSlice=apiSlice.injectEndpoints({
     endpoints:(builder)=>({

     register:builder.mutation<string,Users>({
                query: (newItem) => ({
                    url: "/users",
                    method: "POST",
                    body: newItem
                }),
                invalidatesTags: ["Users"]
            }),
            login: builder.mutation<Users,LoginedUser>({
                query: (partialUser) => ({
                    url:"/users/login",
                    method:"POST",
                    body:partialUser
                }),
                invalidatesTags: ["Users"]
            }),
        })
    })
           
export const {
       useRegisterMutation,
       useLoginMutation,
      }= usersApiSlice;


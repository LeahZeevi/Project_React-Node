//  import usersApiSlices from "../usersApiSlices";
//  import User from "../../../interfaces/User";

// const usersApiSlice=usersApiSlices.injectEndpoints({
//      endpoints:(builder)=>({

//      addUser:builder.mutation<void,User>({
//                 query: (newItem) => ({
//                     url: "/users",
//                     method: "POST",
//                     body: newItem
//                 }),
//                 invalidatesTags: ["Users"]
//             }),
//             getUserById: builder.query<User,String>({
//                 query: (id) => `/users:${id}`,
//                 providesTags: ["Users"]
//             }),
//         })
//     })
           
    
        
    
// export const {
//        useAddUserMutation,
//        useGetUserByIdQuery,
//       }= usersApiSlices;
// export default usersApiSlices;

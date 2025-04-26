// import { createApi, fetchBaseQuery,  } from "@reduxjs/toolkit/query";

// const apiSlice=createApi({
//     reducerPath:'users',
//     baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
//     tagTypes:["Users"],
//     endpoints: () => ({})
    
// })
// export default apiSlice;




import { createApi, fetchBaseQuery,  } from "@reduxjs/toolkit/query";

const apiSlice=createApi({
    reducerPath:'users',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    endpoints: () => ({})
    
})
export default apiSlice;




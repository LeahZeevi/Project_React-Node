
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlices";
import userSlice from "./slices/userSlice";

const store=configureStore({
reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
    users:userSlice

},
middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(apiSlice.middleware)
}
})


export default store




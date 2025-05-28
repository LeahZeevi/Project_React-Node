
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlices";
import userSlice from "./slices/userSlice";
import itemSlice from "./slices/itemSlice"
const store=configureStore({
reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
    users:userSlice,
    items:itemSlice

},
middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(apiSlice.middleware)
}
})


export default store




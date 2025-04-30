
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlices";
import userSlice from "./slices/userSlice";
import itemsSlice from "./slices/itemsSlice";
import apiSliceCookies from "./slices/apiSliceCookies";

const store=configureStore({
reducer:{
    // [itemsApiSlice.reducerPath]:apiSlice.reducer,
    [apiSliceCookies.reducerPath]: apiSliceCookies.reducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
    // [usersApiSlice.reducerPath]:apiSlice.reducer,
    items:itemsSlice,
    users:userSlice

},
middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(apiSlice.middleware)
}
})


export default store




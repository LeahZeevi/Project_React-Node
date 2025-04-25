
import { configureStore } from "@reduxjs/toolkit";
import itemsApiSlice from "./api/slices/itemsApiSlice";
import apiSlice from "./api/apiSlices";

const store=configureStore({
reducer:{
    [itemsApiSlice.reducerPath]:apiSlice.reducer
},
middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(apiSlice.middleware)
}
})


export default store




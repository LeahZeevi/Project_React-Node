import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Users } from "../../interfaces/Users"
import reducer from "./itemsSlice";
import Item from "../../interfaces/Items";

interface CurrentUser {
    currentUser: Users;
    
  }
const initialState:Users={
    userName: "",
    city: "",
    email: "",
    password: "",
    myWardrobe:[{itemName: "",url: "",categoryName: "", session: "",categoryId: 0,inUse: false,countWear: 0,style: ""}]

}
const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{
        setCurrentUser(state:Users,action:PayloadAction<Users>){
             state=action.payload
        }


    }
    
})
export const {setCurrentUser}=userSlice.actions

export const selectUserWardrobe = (state:CurrentUser) => state.currentUser.myWardrobe
export const selectUser = (state:CurrentUser) => state.currentUser


export const select = (state:CurrentUser) => state.currentUser.myWardrobe

export default userSlice.reducer
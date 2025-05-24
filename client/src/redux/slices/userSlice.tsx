import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../../interfaces/Users";
interface CurrentUser {
  currentUsr: Users;
}
const initialState: CurrentUser = {
  currentUsr: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null

};


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<Users>) {
      state.currentUsr = action.payload;
    },
  }
});
export const selectUser = (state: { users: CurrentUser }): Users => { return state.users.currentUsr };

export const { setCurrentUser } = userSlice.actions;



export default userSlice.reducer;


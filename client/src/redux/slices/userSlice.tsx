

import { createSelector, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../../interfaces/Users";
import Item from "../../interfaces/Items";
import { RootOptions } from "react-dom/client";
import { RootState } from "@reduxjs/toolkit/query";

const initialState: Users = {
  userName: "",
  city: "",
  email: "",
  password: "",
  myWardrobe: [{} as Item],
  _id: "",
 
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<Users>) {
      state = action.payload;
    },
  }
});
export const { setCurrentUser } = userSlice.actions;
export const selectUser = (state:Users) => state.users;
export default userSlice.reducer;

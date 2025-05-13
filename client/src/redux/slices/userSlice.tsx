

import { createSelector, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../../interfaces/Users";
import Item from "../../interfaces/Items";

interface CurrentUserState {
  currentUser: Users;
}

const initialState: CurrentUserState = {
  currentUser: {
    userName: "",
    city: "",
    email: "",
    password: "",
    myWardrobe: [{} as Item],
    // _id: ""
  }
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<Users>) {
      state.currentUser = action.payload;
    },
     addItemToWardrobe(state, action: PayloadAction<Item>) {
      state.currentUser.myWardrobe.push(action.payload); // הוספת פריט חדש לארון הבגדים
    }
  }
});


 




export const { setCurrentUser,addItemToWardrobe } = userSlice.actions;

export const selectUserWardrobe = (state: CurrentUserState) => state.currentUser.myWardrobe;
export const selectItemsByCategoryName = (categoryName: string) =>
    createSelector(
      [selectUserWardrobe],
      (items) => items.filter((item) => item.categoryName === categoryName)
    );
export const selectUser = (state: { users: CurrentUserState }) => state.users.currentUser;
export default userSlice.reducer;

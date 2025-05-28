import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Item from "../../interfaces/Items";
interface Items {
  allItems: Item[];
  itemsInUse: Item[];
  itemInLaundry: Item[];
}
const initialState: Items = {
  allItems: [],
  itemsInUse: [],
  itemInLaundry: []
};


const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItemsInUse(state, action: PayloadAction<Item|Item[]>) {
       const payload = action.payload;

      if (Array.isArray(payload)) {
        state.itemInLaundry.push(...payload); // אם זה מערך, מוסיפים את כולם
      } else {
        state.itemInLaundry.push(payload); // אם זה פריט יחיד
      }
    },
    setItemsInLaundry(state, action: PayloadAction<Item | Item[]>) {
      const payload = action.payload;

      if (Array.isArray(payload)) {
        state.itemInLaundry.push(...payload); // אם זה מערך, מוסיפים את כולם
      } else {
        state.itemInLaundry.push(payload); // אם זה פריט יחיד
      }
    }
  }
});
export const selectItemInUse = (state: { items: Items }): Item[] => { return state.items.itemsInUse };
export const selectItemInLaundry = (state: { items: Items }): Item[] => { return state.items.itemInLaundry };

export const { setItemsInUse, setItemsInLaundry } = itemSlice.actions;



export default itemSlice.reducer;


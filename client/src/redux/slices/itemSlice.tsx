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
    setAllItems(state, action: PayloadAction<Item[]>) {
      state.allItems = action.payload
      action.payload.map(item=>{
        item.inUse&&state.itemsInUse.push(item);
        item.inLaundryBasket&&state.itemInLaundry.push(item);
      })
    },
    
    updateAllItems(state, action: PayloadAction<Item[]>) {
      const updatedItems = action.payload;
      state.allItems = state.allItems.map(item => {
        const updated = updatedItems.find(u => u._id === item._id);
        return updated ? updated : item;
      });
    },

    setItemsInUse(state, action: PayloadAction<Item | Item[]>) {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        state.itemsInUse = payload; // אם זה מערך, מוסיפים את כולם
      } else {
        state.itemsInUse.push(payload); // אם זה פריט יחיד
      }
    },
    setItemsInLaundry(state, action: PayloadAction<Item | Item[]>) {
      const payload = action.payload;

      if (Array.isArray(payload)) {
        state.itemInLaundry = payload; // אם זה מערך, מוסיפים את כולם
      } else {
        state.itemInLaundry.push(payload); // אם זה פריט יחיד
      }
    }
  }
});
export const selectItemInUse = (state: { items: Items }): Item[] => { return state.items.itemsInUse };
export const selectItemInLaundry = (state: { items: Items }): Item[] => { return state.items.itemInLaundry };
export const selectAllItems = (state: { items: Items }): Item[] => { return state.items.allItems }
// export const selectCurrentWorn = (state: { items: Items }): Item[] => {
//   return state.items.allItems.filter(item => item.inUse);
// };
export const { setItemsInUse, setItemsInLaundry, setAllItems,updateAllItems} = itemSlice.actions;



export default itemSlice.reducer;


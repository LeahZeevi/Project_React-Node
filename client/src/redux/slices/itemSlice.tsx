import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Item from "../../interfaces/Items";
import { Looks } from "../../interfaces/Looks";
interface Items {
  allItems: Item[];
  itemsInUse: Item[];
  itemInLaundry: Item[];
  looks: Looks[];
}
const initialState: Items = {
  allItems: [],
  itemsInUse: [],
  itemInLaundry: [],
  looks: []
};


const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setAllItems(state, action: PayloadAction<Item[] | Item>) {
       if (Array.isArray(action.payload)){
      state.allItems = action.payload
      action.payload.map(item=>{
        item.inUse&&state.itemsInUse.push(item);
        item.inLaundryBasket&&state.itemInLaundry.push(item);
      })}
      else{
        state.allItems.push(action.payload);        
      }
    },
      setAllLooks(state, action: PayloadAction<Looks[]>) {
      state.looks= action.payload
      action.payload.map(look=>{
        look.itemsInlook.map(item=>{
        item&&state.itemsInUse.push(item);
        item.inLaundryBasket&&state.itemInLaundry.push(item);
      })
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
    },
    addLook(state, action: PayloadAction<Looks>) {
      const look = action.payload;
      if (!state.looks.some(existingLook => existingLook._id === look._id)) {
        state.looks.push(look);
      }
    },
    removeLook(state, action: PayloadAction<string>) {
      const lookId = action.payload;
      state.looks = state.looks.filter(look => look._id !== lookId);
      
    },
  }
});
export const selectItemInUse = (state: { items: Items }): Item[] => { return state.items.itemsInUse };
export const selectItemInLaundry = (state: { items: Items }): Item[] => { return state.items.itemInLaundry };
export const selectAllItems = (state: { items: Items }): Item[] => { return state.items.allItems }
export const selectAllLooks = (state: { items: Items }): Looks[] => { return state.items.looks }

export const { setItemsInUse, setItemsInLaundry, setAllItems,updateAllItems,setAllLooks,removeLook} = itemSlice.actions;




export default itemSlice.reducer;


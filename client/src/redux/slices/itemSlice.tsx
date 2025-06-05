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
console.log("itemSlice initialState", initialState);


const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setAllItems(state, action: PayloadAction<Item[] | Item>) {
      const addUnique = (array: Item[], item: Item) => {
        const exists = array.some(existing => existing._id === item._id);
        if (!exists) {
          array.push(item);
        }
      };

      if (Array.isArray(action.payload)) {
        action.payload.forEach(item => {
          addUnique(state.allItems, item);

          if (item.inUse) {
            addUnique(state.itemsInUse, item);
          }

          if (item.inLaundryBasket) {
            addUnique(state.itemInLaundry, item);
          }
        });
      } else {
        addUnique(state.allItems, action.payload);

        if (action.payload.inUse) {
          addUnique(state.itemsInUse, action.payload);
        }

        if (action.payload.inLaundryBasket) {
          addUnique(state.itemInLaundry, action.payload);
        }
      }
    },

    setAllLooks(state, action: PayloadAction<Looks[] | Looks>) {
      const looksArray = Array.isArray(action.payload) ? action.payload : [action.payload];
      if (Array.isArray(action.payload)) {
        state.looks = action.payload;
      } else {
        state.looks.push(action.payload);
      }
      looksArray.forEach(look => {
        look.itemsInlook.forEach(item => {
          if (item) {
            if (!state.itemsInUse.find(existing => existing._id === item._id)) {
              state.itemsInUse.push(item);
            }

            if (item.inLaundryBasket && !state.itemInLaundry.find(existing => existing._id === item._id)) {
              state.itemInLaundry.push(item);
            }
          }
        });
      });
    },

    updateAllItems(state, action: PayloadAction<Item[]>) {
      const updatedItems = action.payload;
      state.allItems = state.allItems.map(item => {
        const updated = updatedItems.find(u => u._id === item._id);
        return updated ? updated : item;
      });
    },
    updateAllLooks(state, action: PayloadAction<Looks[]>) {
      const updateLook = action.payload;
      state.looks = state.looks.map(look => {
        const updated = updateLook.find(l => l._id === look._id);
        return updated ? updated : look;
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
    }
  }
});
export const selectItemInUse = (state: { items: Items }): Item[] => { return state.items.itemsInUse };
export const selectItemInLaundry = (state: { items: Items }): Item[] => { return state.items.itemInLaundry };
export const selectAllItems = (state: { items: Items }): Item[] => { return state.items.allItems }
export const selectAllLooks = (state: { items: Items }): Looks[] => { return state.items.looks }

export const { setItemsInUse, setItemsInLaundry, setAllItems, updateAllItems, updateAllLooks, setAllLooks } = itemSlice.actions;




export default itemSlice.reducer;


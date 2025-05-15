import { createSelector, createSlice } from "@reduxjs/toolkit"
import Item from "../../interfaces/Items";
import { useSelector } from "react-redux";
import { use } from "react";
import { useInitialAllItemsMutation } from "../api/apiSllices/itemsApiSlice";
interface ItemsState {
    itemsList: Item[];
}
    

const initialState: ItemsState = {
    itemsList: []
};
    
    // const items=use



const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.itemsList.push(action.payload)
        },
        removeItem: (state, action) => {
            state.itemsList = state.itemsList.filter((item) => item.itemName !== action.payload.ItemName)
        },
        updateItem: (state, action) => {
            const index = state.itemsList.findIndex((item) => item.itemName === action.payload.ItemName)
            if (index !== -1) {
                state.itemsList[index] = action.payload
            }
        }
    }

})
// export const selectItems = (state: ItemsState) => state.itemsList
// state: כל ה-state של ה-store, לכן צריך לגשת ל-state.items
export const selectItems = (state: { items: ItemsState }) => state.items.itemsList;

export const selectItemsByCategoryName = (categoryName: string) =>
    createSelector(
      [selectItems],
      (items) => items.filter((item) => item.categoryName === categoryName)
    );  
export const selectItemsInUse = createSelector(
  [selectItems],
  (items) => items.filter(item => item.inUse === true)
);

export const { addItem, removeItem, updateItem } = itemSlice.actions

export default itemSlice.reducer
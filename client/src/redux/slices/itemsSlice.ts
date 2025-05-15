import { createSelector, createSlice } from "@reduxjs/toolkit"
import Item from "../../interfaces/Items";

interface ItemsState {
    itemsList:Item[];
}

const initialState: ItemsState = {
    itemsList:[]
};

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        initialItemList:(state,action)=>{
         state.itemsList=action.payload
        },
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
export const selectItems = (state: ItemsState) => state.itemsList
export const selectItemsByCategoryName = (categoryName: string) =>
    createSelector(
        [selectItems],
        (items) => items.filter((item) => item.categoryName === categoryName)
    );


export const { addItem, removeItem, updateItem,initialItemList } = itemSlice.actions

export default itemSlice.reducer
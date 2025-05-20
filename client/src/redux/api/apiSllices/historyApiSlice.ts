import HistoryItem from "../../../interfaces/HistoryItem";
import apiSlice from "../apiSlices";

const historyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addHistoryItem: builder.mutation<HistoryItem,HistoryItem>({
            query: (newHistoryItem) => ({
                url: "/history",
                method: "POST",
                body: newHistoryItem
            }),
            invalidatesTags: ["History"]
        })
    })
})

export const {
    useAddHistoryItemMutation,
} = historyApiSlice;


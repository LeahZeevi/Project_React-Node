import EventWearning from "../../../interfaces/EventWearning";
import HistoryItem from "../../../interfaces/HistoryItem";
import apiSlice from "../apiSlices";

const wearningApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addEventWearning: builder.mutation<{message:string,newWearn:EventWearning} ,EventWearning>({
            query: (newEventWearning) => ({
                url: "/wearnings",
                method: "POST",
                body: newEventWearning
            }),
            invalidatesTags: ["Wearning"]
        })
    })
})

export const {
    useAddEventWearningMutation,
} = wearningApiSlice;


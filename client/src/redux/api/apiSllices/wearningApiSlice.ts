import EventWearning from "../../../interfaces/EventWearning";
import HistoryItem from "../../../interfaces/HistoryItem";
import Item from "../../../interfaces/Items";
import apiSlice from "../apiSlices";

const wearningApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addEventWearning: builder.mutation<{ newWearn: EventWearning }, EventWearning>({
            query: (newEventWearning) => ({
                url: "/wearnings",
                method: "POST",
                body: newEventWearning
            }),
            invalidatesTags: ["Wearning"]
        }),
            getEventsWearning: builder.query<Item[], string>({
            query: (_id) => `/wearnings/${_id}`,
            providesTags: ["Wearning"]
        }),

    })
})

export const {
    useAddEventWearningMutation,
    useGetEventsWearningQuery
} = wearningApiSlice;


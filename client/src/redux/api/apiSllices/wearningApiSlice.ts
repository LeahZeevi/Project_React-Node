import EventWearning from "../../../interfaces/EventWearning";
import HistoryItem from "../../../interfaces/HistoryItem";
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
        getEventWearning: builder.query<EventWearning[], string>({
            query: (_id) => `/wearnings/${_id}`,
            providesTags: ["History"]

        })

    })
})

export const {
    useAddEventWearningMutation,
    useGetEventWearningQuery
} = wearningApiSlice;


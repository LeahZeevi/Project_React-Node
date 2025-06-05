import { Looks } from "../../../interfaces/Looks";
import apiSlice from "../apiSlices";

const looksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllLooks: builder.query<{allLooks:Looks[]}, string>({
            query: (user_id) => `/looks/${user_id}`,

            providesTags: ["Looks"],
        }),
        addLook: builder.mutation<{ newLook: Looks }, Looks>({
            query: (newLook) => ({
                url: "/looks",
                method: "POST",
                body: newLook
            }),
            invalidatesTags: ["Looks"]
        }),
        deleteLook: builder.mutation<void, string>({
            query: (_id) => ({
                url: `/looks/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Looks"]
        }),
        updateNameOfLook: builder.mutation<Looks, { _id: string, nameLook: string }>({
            query: ({ _id, nameLook }: { _id: string, nameLook: string }) => ({
                url: `/looks`,
                method: "PATCH",
                body: { _id, nameLook }

            }),
            invalidatesTags: ["Looks"]

        }),

        updateLookInClothing: builder.mutation<{ inClothingLooks:Looks[], updatedLook: Looks }, { _id: string, inClothing: boolean, userId: string }>({
            query: ({ _id, inClothing, userId }: { _id: string; inClothing: boolean, userId: string }) => ({
                url: `/looks/update`,
                method: "PATCH",
                body: { _id, inClothing, userId }

            }),
            invalidatesTags: ["Looks"]

        }),

    })
})

export const {
    useGetAllLooksQuery,
    useAddLookMutation,
    useDeleteLookMutation,
    useUpdateNameOfLookMutation,
    useUpdateLookInClothingMutation
} = looksApiSlice;


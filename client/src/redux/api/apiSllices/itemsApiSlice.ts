import apiSlices from "../apiSlices";
import Item from "../../../interfaces/Items";
export const itemsApiSlice = apiSlices.injectEndpoints({

    endpoints: (builder) => ({
        getAllItems: builder.mutation<Item[], string>({//לשים לב _id של משתמש שלפיו נשלוף לו את הפריטים שלו
            query: (_id) => ({
                url: `/items/AllIems/${_id}`,
                method: "GET",
            }),
            invalidatesTags: ["Items"],
        }),
        addItem: builder.mutation<string, { _id: string, newItem: FormData }>({
            query: ({ _id, newItem }: { _id: string; newItem: FormData }) => ({
                url: `/items/${_id}`,
                method: "POST",
                body: newItem,
                formData: true,
            }),

            invalidatesTags: ["Items"],
        }),
        getItemById: builder.query<Item, string>({
            query: (id) => `/items/${id}`,
            providesTags: ["Items"]
        }),
        updateItem: builder.mutation<Item, { _id: string, inUse: boolean }>({
            query: ({ _id, inUse }: { _id: string; inUse: boolean }) => ({
                url: `/items/${_id}/${inUse}`,
                method: "PATCH"
            }),
            invalidatesTags: ["Items"]
        }),
        deleteItem: builder.mutation<void, Item>({
            query: (id) => ({
                url: `/items/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Items"]
        })

    })
})
export const {
    useAddItemMutation,
    useGetAllItemsMutation,
    useGetItemByIdQuery,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = itemsApiSlice;
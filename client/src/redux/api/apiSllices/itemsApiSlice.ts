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
        updateItemInUse: builder.mutation<Item[], { _id: string, inUse: boolean,userId:string}>({
            query: ({ _id, inUse,userId }: { _id: string; inUse: boolean,userId:string }) => ({
                url: `/items`,
                method: "PATCH",
                body: {_id, inUse,userId }
            }),
            invalidatesTags: ["Items"]
        }),  updateItemInLaundryBasket: builder.mutation<Item[], { _id: string, inLaundryBasket: boolean,userId:string}>({
            query: ({ _id, inLaundryBasket,userId }: { _id: string; inLaundryBasket: boolean,userId:string }) => ({
                url: `/items/inLaundryBasket`,
                method: "PATCH",
                body: {_id, inLaundryBasket,userId }
            }),
            invalidatesTags: ["Items"]
        }),

        deleteItem: builder.mutation<void, Item>({
            query: (item) => ({
                url: `/items/${item._id}`,
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
    useUpdateItemInLaundryBasketMutation,
    useUpdateItemInUseMutation,
    useDeleteItemMutation,
} = itemsApiSlice;
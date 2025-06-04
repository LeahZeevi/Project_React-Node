import apiSlices from "../apiSlices";
import Item from "../../../interfaces/Items";
export const itemsApiSlice = apiSlices.injectEndpoints({

    endpoints: (builder) => ({
        getAllItems: builder.query<Item[], string>({
            query: (_id) => `/items/AllIems/${_id}`,
            providesTags: ["Items"]
        }),

        addItem: builder.mutation<{newItem:Item}, { _id: string, newItem: FormData }>({
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

        updateItemInUse: builder.mutation<{inUseItems:Item[],updatedItem:Item}, { _id: string, inUse: boolean, userId: string }>({
            query: ({ _id, inUse, userId }: { _id: string; inUse: boolean, userId: string }) => ({
                url: `/items`,
                method: "PATCH",
                body: { _id, inUse, userId }
                
            }),
            invalidatesTags: ["Items"]
            
        }), updateItemInLaundryBasket: builder.mutation<{itemsInLaundry:Item[],updatedItem:Item}, { _id: string, inLaundryBasket: boolean, userId: string }>({
            query: ({ _id, inLaundryBasket, userId }: { _id: string; inLaundryBasket: boolean, userId: string }) => ({
                url: `/items/inLaundryBasket`,
                method: "PATCH",
                body: { _id, inLaundryBasket, userId }
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
    useGetAllItemsQuery,
    useGetItemByIdQuery,
    useUpdateItemInLaundryBasketMutation,
    useUpdateItemInUseMutation,
    useDeleteItemMutation,
} = itemsApiSlice;
import apiSlices from "../apiSlices";
import Item from "../../../interfaces/Items";

export const itemsApiSlice = apiSlices.injectEndpoints({
    endpoints: (builder) => ({
        initialAllItems: builder.mutation<Item[],void>({
            query: (_id) => ({
                url: "/items/",
                method: "GET",
            }),
            invalidatesTags: ["Items"],
        }),
        addItem: builder.mutation<string,{ _id:string, newItem: FormData }>({
            query: ({ _id, newItem }: { _id: string; newItem: FormData }) => ({
                url: `/items/${_id}`,
                method: "POST",
                body: newItem,
                formData: true,
                
            }),
            invalidatesTags: ["Items"],
        }),
        getItemById: builder.query<Item,string>({
            query: (id) => `/items/${id}`,
            providesTags: ["Items"]
        }),
        getItemsByCategoryId: builder.query<Item[],string>({
            query: (categoryId) => `items/category/${categoryId}`,
            providesTags: ["Items"]
        }),
        updateItem: builder.mutation<void,Item>({
            query: (updateItem) => ({

                url: `/${updateItem.itemName}`,

                method: "PATCH",
                body: updateItem
            }),
            invalidatesTags: ["Items"]
        }),
        deleteItem:builder.mutation<void,Item>({
            query:(id)=>({
                url:`/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Items"]
        })

    })
})
export const {
    useAddItemMutation,
    useInitialAllItemsMutation,
    useGetItemByIdQuery,
    useGetItemsByCategoryIdQuery,
    useUpdateItemMutation,
    useDeleteItemMutation,
  }= itemsApiSlice;
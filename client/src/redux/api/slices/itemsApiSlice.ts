import apiSlice from "../apiSlices";
 import Item from "../../../interfaces/Items";

 const itemsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addItem: builder.mutation<void,Item>({
            query: (newItem) => ({
                url: "/items",
                method: "POST",
                body: newItem
            }),
            invalidatesTags: ["Items"]
        }),
        getItemById: builder.query<Item,string>({
            query: (id) => `/items${id}`,
            providesTags: ["Items"]
        }),
        getItemsByCategoryId: builder.query<Item[],string>({
            query: (categoryId) => `items/category/${categoryId}`,
            providesTags: ["Items"]
        }),
        updateItem: builder.mutation<void,Item>({
            query: (updateItem) => ({
                url: `/${updateItem.ItemId}`,
                method: "PATCH",
                body: updateItem
            }),
            invalidatesTags: ["Items"]
        }),
        deletItem:builder.mutation<void,Item>({
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
    useGetItemByIdQuery,
    useGetItemsByCategoryIdQuery,
    useUpdateItemMutation,
    useDeleteItemMutation,
  }= apiSlice;
  export default   itemsApiSlice;
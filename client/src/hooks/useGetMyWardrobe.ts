
// import { useDispatch } from "react-redux";
// import { useGetItemByIdQuery } from "../redux/api/apiSllices/itemsApiSlice";
// import { initialItemList, selectItems } from "../redux/slices/itemsSlice";
// import { useSelector } from "react-redux";
// import MyWardrobe from "../pages/MyWardrobe";
// import Item from "../interfaces/Items";
// import { data } from "react-router";

//  export const useGetMyWardrobe = () => {
//   const dispatch=useDispatch();
//  const items=useSelector(selectItems)

//   if(!items){
//    const userString:string|null = localStorage.getItem('user');
//    const userId: string = JSON.parse(userString as string)._id;
//     const {data,isLoading,error}=useGetItemByIdQuery(userId);
//     const myWardrobe=data;
//     console.log(data);
//    if(data){
//     console.log(data);
//     dispatch(initialItemList(data));
//    }
// }
//     return { user: myWardrobe ? : currentUser, isLoading, error };
// }

import { useDispatch, useSelector } from "react-redux";
import { useGetItemByIdQuery } from "../redux/api/apiSllices/itemsApiSlice";
import { initialItemList, selectItems } from "../redux/slices/itemsSlice";
import { useEffect } from "react";

export const useGetMyWardrobe = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectItems);

    const userString = localStorage.getItem('user');
    const userId = userString ? JSON.parse(userString)._id : null;
    const { data, isLoading, error } = useGetItemByIdQuery(userId, {
        skip: !userId,
    });

    useEffect(() => {
        if (data) {
            dispatch(initialItemList(data));
        }
    }, [data, dispatch]);
    return {
        myWardrobe: data ? data : items,
        isLoadingMyWardrobe:isLoading,
        errorMyWardrobe:error,
    };
};

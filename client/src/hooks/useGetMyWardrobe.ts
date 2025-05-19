

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

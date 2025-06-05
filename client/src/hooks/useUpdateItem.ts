import { useDispatch, useSelector } from "react-redux";
import Item from "../interfaces/Items";
import { useUpdateItemInUseMutation } from "../redux/api/apiSllices/itemsApiSlice";
import { selectAllLooks, setAllLooks, setItemsInUse, updateAllItems, updateAllLooks } from "../redux/slices/itemSlice";
import { Users } from "../interfaces/Users";
import { selectUser } from "../redux/slices/userSlice";
import { useGetAllLooksQuery, useUpdateLookInClothingMutation } from "../redux/api/apiSllices/looksApiSlice";
import { data } from "react-router";
import { Looks } from "../interfaces/Looks";
import { useEffect } from "react";

const useUpdateItem = () => {
    const [updateItemInUse] = useUpdateItemInUseMutation();
    const dispatch = useDispatch()
    const user: Users = useSelector(selectUser);

    // const updateItem = async (item: Item, inUse: boolean) => {
    //     try {
    //         const { inUseItems, updatedItem } = await updateItemInUse({ _id: item._id, inUse, userId: user._id }).unwrap();
    //         dispatch(setItemsInUse(inUseItems));
    //         if (inUse === false) {
    //             const updateItems = [...inUseItems, updatedItem];
    //             dispatch(updateAllItems(updateItems));
    //         }
    //         else {
    //             dispatch(updateAllItems(inUseItems))
    //         }
    //         // if (inUse === true) {
    //         //     setAlertItemId(item._id);
    //         //     setShowAlert(true)
    //         // }
    //     } catch (err) {
    //         console.error('שגיאה בעדכון לבישה:', err);
    //     }
    //     // console.log("currentWorn",currentlyWornItem);

    // };
    const [updateLookInClothing] = useUpdateLookInClothingMutation();
    const allLooks: Looks[] = useSelector(selectAllLooks)
    const { data, error, isLoading } = useGetAllLooksQuery(user._id) // נניח שיש את זה
    const fetchWardrobe = async () => {
        if (allLooks.length === 0) {
            try {
                const looks: Looks[] = data ? data.allLooks : [];
                dispatch(setAllLooks(looks));
            } catch (err) {
                console.error('שגיאה בקבלת פריטים:', err);
            }
        }
    };

    useEffect(() => {
        fetchWardrobe();

    }, [data]);



    const updateItem = async (item: Item, inUse: boolean) => {
        try {
            const { inUseItems, updatedItem } = await updateItemInUse({
                _id: item._id,
                inUse,
                userId: user._id,
            }).unwrap();

            dispatch(setItemsInUse(inUseItems));

            if (inUse === false) {
                
                const updateItems = [...inUseItems, updatedItem];
                dispatch(updateAllItems(updateItems));
                // const looksWithItem: Looks[] = allLooks?.filter((look) =>
                //     look.itemsInlook.some((i) => i._id === item._id)
                // );

                // if (looksWithItem && looksWithItem.length > 0) {
                //     for (const look of looksWithItem) {
                //         if (look.inClothing === true) {
                //             const { inClothingLooks, updatedLook } = await updateLookInClothing({
                //                 _id: look._id,
                //                 inClothing: true,
                //                 userId: user._id
                //             }).unwrap()
                //             const looks: Looks[] = [...inClothingLooks, updatedLook];
                //             console.log("updateLook",looks);
                            
                //             dispatch(updateAllLooks(looks));
                //         }
                //     }
                // }
            } else {
                dispatch(updateAllItems(inUseItems));
            }

            // if (inUse === true) {
            //   setAlertItemId(item._id);
            //   setShowAlert(true);
            // }
        } catch (err) {
            console.error("שגיאה בעדכון לבישה:", err);
        }
    };

    return { updateItem };
}
export default useUpdateItem;
import { useDispatch, useSelector } from "react-redux";
import Item from "../interfaces/Items";
import { useUpdateItemInUseMutation } from "../redux/api/apiSllices/itemsApiSlice";
import { setItemsInUse, updateAllItems } from "../redux/slices/itemSlice";
import { Users } from "../interfaces/Users";
import { selectUser } from "../redux/slices/userSlice";

const useUpdateItem = () => {
    const [updateItemInUse] = useUpdateItemInUseMutation();
    const dispatch = useDispatch()
    const user: Users = useSelector(selectUser);

    const updateItem = async (item: Item, inUse: boolean) => {
        try {
            const { inUseItems, updatedItem } = await updateItemInUse({ _id: item._id, inUse, userId: user._id }).unwrap();
            dispatch(setItemsInUse(inUseItems));
            if (inUse === false) {
                const updateItems = [...inUseItems, updatedItem];
                dispatch(updateAllItems(updateItems));
            }
            else {
                dispatch(updateAllItems(inUseItems))
            }
            // if (inUse === true) {
            //     setAlertItemId(item._id);
            //     setShowAlert(true)
            // }
        } catch (err) {
            console.error('שגיאה בעדכון לבישה:', err);
        }
        // console.log("currentWorn",currentlyWornItem);

    };
    return { updateItem};
}
export default useUpdateItem;